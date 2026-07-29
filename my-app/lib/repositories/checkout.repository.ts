// lib/repositories/checkout.repository.ts
import { db } from "@/lib/db/dbconnect";

/* ==========================================================
   TYPES
========================================================== */

export interface ShippingAddressInput {
  full_name: string;
  phone: string;
  email?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
}

export interface CheckoutInput {
  userId: number;
  paymentMethod: "COD" | "CARD" | "BKASH" | "NAGAD" | "ROCKET";
  shipping: ShippingAddressInput;
}

/* ==========================================================
   GET ACTIVE CART
========================================================== */

export async function getActiveCart(userId: number) {
  const result = await db.query(
    `
    SELECT *
    FROM orders
    WHERE user_id=$1
      AND status='cart'
    LIMIT 1
    `,
    [userId]
  );
  return result.rows[0] ?? null;
}

/* ==========================================================
   CART ITEMS
========================================================== */

export async function getCartItems(orderId: number) {
  const result = await db.query(
    `
    SELECT
        oi.id,
        oi.product_id,
        oi.quantity,
        p.price,
        p.discount,
        p.stock
    FROM ordered_items oi
    JOIN products p ON oi.product_id=p.id
    WHERE oi.order_id=$1
    `,
    [orderId]
  );
  return result.rows;
}

/* ==========================================================
   SAVE SHIPPING ADDRESS
========================================================== */

export async function createShippingAddress(
  client: any,
  userId: number,
  shipping: ShippingAddressInput
) {
  const result = await client.query(
    `
    INSERT INTO shipping_addresses
    (user_id, full_name, phone, email, address_line1, address_line2, city, state, postal_code, country)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *
    `,
    [
      userId,
      shipping.full_name,
      shipping.phone,
      shipping.email,
      shipping.address_line1,
      shipping.address_line2,
      shipping.city,
      shipping.state,
      shipping.postal_code,
      shipping.country,
    ]
  );
  return result.rows[0];
}

/* ==========================================================
   CALCULATE TOTAL
========================================================== */

export async function calculateCartTotal(client: any, orderId: number) {
  const result = await client.query(
    `
    SELECT COALESCE(
        SUM(
            oi.quantity * (p.price - (p.price*p.discount/100))
        ), 0
    ) total
    FROM ordered_items oi
    JOIN products p ON oi.product_id=p.id
    WHERE oi.order_id=$1
    `,
    [orderId]
  );
  return Number(result.rows[0].total);
}

/* ==========================================================
   SAVE SNAPSHOT PRICE
========================================================== */

export async function saveItemPrices(client: any, orderId: number) {
  await client.query(
    `
    UPDATE ordered_items oi
    SET
        unit_price=p.price,
        discount=p.discount,
        total_price=
            oi.quantity * (p.price - (p.price*p.discount/100))
    FROM products p
    WHERE oi.product_id=p.id AND oi.order_id=$1
    `,
    [orderId]
  );
}

/* ==========================================================
   CREATE PAYMENT
========================================================== */

export async function createPayment(
  client: any,
  userId: number,
  orderId: number,
  paymentMethod: string,
  amount: number
) {
  const result = await client.query(
    `
    INSERT INTO payments (user_id, order_id, payment_method, amount, payment_status)
    VALUES ($1,$2,$3,$4,'pending')
    RETURNING *
    `,
    [userId, orderId, paymentMethod, amount]
  );
  return result.rows[0];
}

/* ==========================================================
   COMPLETE ORDER
========================================================== */

export async function completeOrder(
  client: any,
  orderId: number,
  shippingId: number,
  paymentId: number,
  total: number
) {
  const result = await client.query(
    `
    UPDATE orders
    SET
        shipping_address_id=$2,
        payment_id=$3,
        total_price=$4,
        status='placed',
        payment_status='pending',
        completed_at=NOW()
    WHERE id=$1
    RETURNING *
    `,
    [orderId, shippingId, paymentId, total]
  );
  return result.rows[0];
}

/* ==========================================================
   CREATE NEW CART
========================================================== */

export async function createNewCart(client: any, userId: number) {
  const result = await client.query(
    `INSERT INTO orders (user_id, status) VALUES ($1, 'cart') RETURNING *`,
    [userId]
  );
  return result.rows[0];
}

/* ==========================================================
   MAIN CHECKOUT TRANSACTION
========================================================== */

export async function checkout(data: CheckoutInput) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const cart = await getActiveCart(data.userId);
    if (!cart) throw new Error("Cart not found");

    const items = await getCartItems(cart.id);
    if (items.length === 0) throw new Error("Cart is empty");

    for (const item of items) {
      if (item.quantity > item.stock) {
        throw new Error("Insufficient stock");
      }
    }

    const shipping = await createShippingAddress(client, data.userId, data.shipping);
    const total = await calculateCartTotal(client, cart.id);
    await saveItemPrices(client, cart.id);

    const payment = await createPayment(client, data.userId, cart.id, data.paymentMethod, total);
    const order = await completeOrder(client, cart.id, shipping.id, payment.id, total);

    // Reduce stock
    await client.query(
      `
      UPDATE products p
      SET stock = p.stock - oi.quantity
      FROM ordered_items oi
      WHERE oi.product_id = p.id AND oi.order_id = $1
      `,
      [cart.id]
    );

    // Create new empty cart for the user
    await createNewCart(client, data.userId);

    await client.query("COMMIT");

    return {
      success: true,
      order,
      payment,
      shipping,
      total,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/* ==========================================================
   NEW: GET ORDER ITEMS (for email)
========================================================== */

export async function getOrderItems(orderId: number) {
  const result = await db.query(
    `
    SELECT 
      p.name,
      oi.quantity,
      (oi.total_price) AS item_total
    FROM ordered_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = $1
    `,
    [orderId]
  );
  return result.rows;
}