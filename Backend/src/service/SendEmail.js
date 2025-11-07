import dotenv from "dotenv"
import {Resend} from "resend"

dotenv.config()

const resend = new Resend(process.env.RESEND)

export const sendEmail = async ({ to, subject, html }) => {
  const fromAddress = `Tasky <onboarding@resend.dev>`;

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error('Failed to send email via Resend:', error.message);
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
};
