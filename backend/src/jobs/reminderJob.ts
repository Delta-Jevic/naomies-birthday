import cron from "node-cron";
import { pool } from "../db/postgres";
import { sendReminderEmail } from "../services/emailService";

/*
Runs every hour.
Checks if event is within 24 hours.
If yes → sends reminder emails.
*/

export function startReminderJob() {
  cron.schedule("0 * * * *", async () => {
    console.log("Running reminder job...");

    try {
      const eventDate = new Date(process.env.EVENT_DATE!);
      const now = new Date();

      const diffHours =
        (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60);

      // Send reminders if event is within next 24 hours
      if (diffHours <= 24 && diffHours > 23) {
        console.log("Sending reminder emails...");

        const result = await pool.query(`
          SELECT name, email
          FROM rsvps
        `);

        for (const guest of result.rows) {
          try {
            await sendReminderEmail(guest.name, guest.email);
          } catch (emailError) {
            console.error(
              `Reminder email failed for ${guest.email}`
            );
          }
        }
      }
    } catch (error) {
      console.error("Reminder job error:", error);
    }
  });
}