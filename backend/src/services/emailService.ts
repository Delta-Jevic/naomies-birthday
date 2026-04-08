import nodemailer from "nodemailer";

/*
This transporter is the object that actually sends email.
For learning, we are using Gmail SMTP.
Later, for production, we can move to Resend, SendGrid, or SES.
*/
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/*
Reusable function to send RSVP confirmation email
*/
export async function sendRsvpConfirmationEmail(
  guestName: string,
  guestEmail: string
) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: guestEmail,
    subject: "RSVP Confirmation - Naomie's Birthday 🎉",
    text: `
Hello ${guestName},

Thank you for your RSVP to Naomie's Birthday.

We are happy to let you know that your RSVP has been received successfully.

Event Details:
Date: April 11, 2026
Time: 3:00 PM
Location: 720 Hank Aaron Drive SE, Atlanta (GA)

We look forward to celebrating with you.

You are Welcome 🎉,
Naomie Ngoie 
    `,
  };

  return await transporter.sendMail(mailOptions);
}

export async function sendReminderEmail(
  guestName: string,
  guestEmail: string
) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: guestEmail,
    subject: "Reminder: Naomie's Birthday is tomorrow 🎉",
    text: `
Hello ${guestName},

This is a friendly reminder that Naomie's Birthday is happening soon!

Event Details:
Date: April 11, 2026
Time: 3:00 PM
Location: 720 Hank Aaron Drive SE, Atlanta (GA)

We are excited to celebrate with you!

See you there 🎉
    `,
  };

  return await transporter.sendMail(mailOptions);
}

export async function sendAdminOtpEmail(
  adminEmail: string,
  code: string
) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: adminEmail,
    subject: "Your Admin Login Verification Code",
    text: `
Hello,

Your admin verification code is:

${code}

This code will expire in 10 minutes.

If you did not request this code, please ignore this email.
    `,
  };

  return await transporter.sendMail(mailOptions);
}