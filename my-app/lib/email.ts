// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderEmailData {
  to: string;
  orderId: number;
  items: {
    name: string;
    quantity: number;
    item_total: number;
  }[];
  total: number;
  shipping: {
    full_name: string;
    phone: string;
    address_line1: string;
    city: string;
    postal_code: string;
    country: string;
  };
  paymentMethod: string;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  const itemsHtml = data.items
    .map(
      (item) =>
        `<tr><td>${item.name} (x${item.quantity})</td><td>৳${Number(item.item_total).toFixed(2)}</td></tr>`
    )
    .join("");

  await resend.emails.send({
    from: "OtakuVault <orders@otakuvault.com>",
    to: data.to,
    subject: `Order #${data.orderId} Confirmed – OtakuVault`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h1 style="color: #8B5CF6;">OtakuVault</h1>
        <h2>Thank you for your order!</h2>
        <p>Your order <strong>#${data.orderId}</strong> has been placed successfully.</p>
        <h3>Order Details</h3>
        <table style="width:100%; border-collapse:collapse;">
          ${itemsHtml}
        </table>
        <p><strong>Total:</strong> ৳${data.total.toFixed(2)}</p>
        <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
        <h3>Shipping Address</h3>
        <p>
          ${data.shipping.full_name}<br/>
          ${data.shipping.address_line1}, ${data.shipping.city}, ${data.shipping.postal_code}<br/>
          ${data.shipping.country}<br/>
          Phone: ${data.shipping.phone}
        </p>
        <br/>
        <p>– The OtakuVault Team</p>
      </div>
    `,
  });
}