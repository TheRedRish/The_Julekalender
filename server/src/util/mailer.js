import FormData from "form-data";
import Mailgun from "mailgun.js";

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || null;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || null;
const MAILGUN_FROM = process.env.MAILGUN_FROM || null;
const MAILGUN_API_BASE = process.env.MAILGUN_API_BASE || null;

const mg =
  MAILGUN_API_KEY && MAILGUN_DOMAIN
    ? new Mailgun(FormData).client({
        username: "api",
        key: MAILGUN_API_KEY,
        url: MAILGUN_API_BASE,
      })
    : null;

async function sendMail({ to, subject, text, html, label }) {
  if (!mg) {
    console.error(`Failed to send ${label} email: MAILGUN_API_KEY and MAILGUN_DOMAIN must be set`);
    return null;
  }

  if (!MAILGUN_FROM) {
    console.error(`Failed to send ${label} email: MAILGUN_FROM must be set`);
    return null;
  }

  try {
    const info = await mg.messages.create(MAILGUN_DOMAIN, {
      from: MAILGUN_FROM,
      to,
      subject,
      text,
      html,
    });

    console.log(`${label} email sent:`);
    return info;
  } catch (error) {
    console.error(`Failed to send ${label} email`, error);
    return null;
  }
}

export async function sendWelcomeEmail(recipientEmail) {
  return sendMail({
    to: recipientEmail,
    subject: "Welcome to The Julekalender",
    text: "Welcome to The Julekalender! Your account has been created.",
    html: `<p>Welcome to The Julekalender! Your account has been created.</p>
<p>You can now log in and start playing.</p>`,
    label: "welcome",
  });
}

export async function sendPasswordResetEmail(recipientEmail, newPassword) {
  return sendMail({
    to: recipientEmail,
    subject: "Your password has been reset",
    text: `Your password has been reset. Temporary password: ${newPassword}\nLog in and change it as soon as possible.`,
    html: `<p>Your password has been reset.</p>
<p>Temporary password: <strong>${newPassword}</strong></p>
<p>Please log in and change it as soon as possible.</p>`,
    label: "password reset",
  });
}
