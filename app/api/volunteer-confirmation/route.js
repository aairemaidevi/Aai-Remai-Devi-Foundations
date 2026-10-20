import nodemailer from "nodemailer";

export const runtime = "nodejs";

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);

export async function POST(request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return Response.json({ error: "Request origin is not allowed." }, { status: 403 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || name.length > 120 || !emailPattern.test(email) || email.length > 254) {
    return Response.json({ error: "A valid name and email are required." }, { status: 400 });
  }

  const sender = process.env.GMAIL_USER;
  const appPassword = process.env.GMAIL_APP_PASSWORD;

  if (!sender || !appPassword) {
    console.error("Gmail SMTP is not configured for volunteer confirmations.");
    return Response.json(
      {
        error: "Confirmation email is not configured for this deployment.",
      },
      { status: 503 },
    );
  }

  const safeName = escapeHtml(name);
  const message = `Thank you for registering as a volunteer with Aai Ramai Devi Educational and Social Institution, Ghonse. You are now on our volunteer list. We have received your details and our team will contact you soon.`;
  const html = `
    <p>Dear ${safeName},</p>
    <p>Thank you for registering as a volunteer with <strong>Aai Ramai Devi Educational and Social Institution, Ghonse</strong>.</p>
    <p>You are now on our volunteer list. We have received your details and our team will contact you soon.</p>
    <p>With gratitude,<br />Aai Ramai Devi Educational and Social Institution</p>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: sender,
        pass: appPassword,
      },
    });

    await transporter.sendMail({
      from: {
        name: "Aai Ramai Devi Foundation",
        address: sender,
      },
      to: email,
      subject: "Your volunteer registration is confirmed",
      text: `Dear ${name},\n\n${message}\n\nWith gratitude,\nAai Ramai Devi Educational and Social Institution`,
      html,
    });
  } catch (error) {
    console.error("Volunteer confirmation email delivery failed:", error);
    return Response.json({ error: "Gmail could not send the confirmation." }, { status: 502 });
  }

  return Response.json({ sent: true });
}
