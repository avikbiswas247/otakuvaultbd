import { db } from "@/lib/db/dbconnect";

/* ===========================
   CART (find / create)
=========================== */

export async function findCartByUserId(userId: number) {
  const result = await db.query(
    `
    SELECT *
    FROM orders
    WHERE user_id = $1
    ORDER BY order_date DESC
    LIMIT 1
    `,
    [userId]
  );
  return result.rows[0] ?? null;
}

export async function createCartForUser(userId: number) {
  const result = await db.query(
    `
    INSERT INTO orders (user_id)
    VALUES ($1)
    RETURNING *
    `,
    [userId]
  );
  return result.rows[0];
}

/* ===========================
   CART ITEMS
=========================== */

export async function findCartItemByCartId(cartId: number, productId: number) {
  const result = await db.query(
    `
    SELECT *
    FROM ordered_items
    WHERE order_id = $1
      AND product_id = $2
    LIMIT 1
    `,
    [cartId, productId]
  );
  return result.rows[0] ?? null;
}

export async function addItemToCart(cartId: number, productId: number, quantity: number) {
  const result = await db.query(
    `
    INSERT INTO ordered_items (order_id, product_id, quantity, total_price)
    VALUES (
      $1,
      $2,
      $3::INTEGER,
      (
        SELECT (price - (price * discount / 100)) * ($3::NUMERIC)
        FROM products
        WHERE id = $2
      )
    )
    RETURNING *
    `,
    [cartId, productId, quantity]
  );
  return result.rows[0];
}

export async function updateCartItemQuantity(itemId: number, quantity: number) {
  const result = await db.query(
    `
    UPDATE ordered_items
    SET
      quantity = $2::INTEGER,
      total_price = (
        SELECT (p.price - (p.price * p.discount / 100)) * ($2::NUMERIC)
        FROM products p
        WHERE p.id = ordered_items.product_id
      )
    WHERE id = $1
    RETURNING *
    `,
    [itemId, quantity]
  );
  return result.rows[0];
}

export async function removeCartItem(itemId: number) {
  await db.query(`DELETE FROM ordered_items WHERE id = $1`, [itemId]);
}

/* ===========================
   USER CART ITEMS
=========================== */

export async function getUserCartItems(cartId: number) {
  const result = await db.query(
    `
    SELECT
      oi.id AS cart_item_id,
      oi.quantity,
      oi.total_price,
      p.id,
      p.name,
      p.description,
      p.price,
      p.discount,
      p.stock,
      p.series,
      p.size,
      p.type,
      p.rating,
      COALESCE(
        (SELECT image_url FROM product_images WHERE product_id = p.id ORDER BY is_primary DESC, id ASC LIMIT 1),
        ''
      ) AS image_url
    FROM ordered_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = $1
    `,
    [cartId]
  );
  return result.rows;
}

/* ===========================
   SINGLE CART ITEM
=========================== */

export async function getCartItemById(itemId: number) {
  const result = await db.query(
    `
    SELECT
      oi.id AS cart_item_id,
      oi.quantity,
      oi.total_price,
      p.id,
      p.name,
      p.description,
      p.price,
      p.discount,
      p.stock,
      p.series,
      p.size,
      p.type,
      p.rating,
      COALESCE(
        (SELECT image_url FROM product_images WHERE product_id = p.id ORDER BY is_primary DESC, id ASC LIMIT 1),
        ''
      ) AS image_url
    FROM ordered_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.id = $1
    `,
    [itemId]
  );
  return result.rows[0] ?? null;
}

/* ===========================
   CART TOTAL
=========================== */

export async function getCartTotal(cartId: number) {
  const result = await db.query(
    `
    SELECT COALESCE(SUM(total_price), 0) AS total
    FROM ordered_items
    WHERE order_id = $1
    `,
    [cartId]
  );
  return Number(result.rows[0].total);
}

/* ===========================
   CART ITEM COUNT
=========================== */

export async function getCartItemCount(cartId: number) {
  const result = await db.query(
    `
    SELECT COALESCE(SUM(quantity), 0)::int AS count
    FROM ordered_items
    WHERE order_id = $1
    `,
    [cartId]
  );
  return Number(result.rows[0].count);
}

/* ===========================
   CLEAR CART
=========================== */

export async function clearCart(cartId: number) {
  await db.query(`DELETE FROM ordered_items WHERE order_id = $1`, [cartId]);
}

/* ===========================
   CHECK PRODUCT EXISTS
=========================== */

export async function cartHasProduct(cartId: number, productId: number) {
  const result = await db.query(
    `
    SELECT EXISTS(
      SELECT 1
      FROM ordered_items
      WHERE order_id = $1 AND product_id = $2
    ) AS exists
    `,
    [cartId, productId]
  );
  return result.rows[0].exists as boolean;
}

/* ===========================
   ORDER HISTORY (for /orders page)
=========================== */

export async function getOrderHistory(userId: number) {
  const result = await db.query(
    `
    SELECT
      o.id AS order_id,
      o.order_date,
      o.status,
      COALESCE(
        json_agg(
          json_build_object(
            'item_id', oi.id,
            'product_id', p.id,
            'name', p.name,
            'quantity', oi.quantity,
            'price_per_unit', p.price,
            'discount', p.discount,
            'total_item_price', oi.total_price,
            'image_url', (
              SELECT pi.image_url
              FROM product_images pi
              WHERE pi.product_id = p.id
              ORDER BY pi.is_primary DESC, pi.id ASC
              LIMIT 1
            )
          )
          ORDER BY oi.id
        ),
        '[]'::json
      ) AS items,
      SUM(oi.total_price) AS total_amount
    FROM orders o
    JOIN ordered_items oi ON oi.order_id = o.id
    JOIN products p ON p.id = oi.product_id
    WHERE o.user_id = $1 AND o.status = 'placed'
    GROUP BY o.id
    ORDER BY o.order_date DESC
    `,
    [userId]
  );
  return result.rows;
}

export async function getOrderById(orderId: number) {
  const result = await db.query(
    `
    SELECT
      o.id AS order_id,
      o.order_date,
      o.status,
      COALESCE(
        json_agg(
          json_build_object(
            'item_id', oi.id,
            'product_id', p.id,
            'name', p.name,
            'quantity', oi.quantity,
            'price_per_unit', p.price,
            'discount', p.discount,
            'total_item_price', oi.total_price,
            'image_url', (
              SELECT pi.image_url
              FROM product_images pi
              WHERE pi.product_id = p.id
              ORDER BY pi.is_primary DESC, pi.id ASC
              LIMIT 1
            )
          )
          ORDER BY oi.id
        ),
        '[]'::json
      ) AS items,
      SUM(oi.total_price) AS total_amount
    FROM orders o
    JOIN ordered_items oi ON oi.order_id = o.id
    JOIN products p ON p.id = oi.product_id
    WHERE o.id = $1
    GROUP BY o.id
    `,
    [orderId]
  );
  return result.rows[0] ?? null;
}