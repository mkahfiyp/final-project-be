// subscriptionReminder.template.ts

export function subscriptionReminderTemplate(userName: string, endDate: Date): { subject: string; html: string; text: string } {
    const formattedDate = endDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const subject = "Your subscription will expire tomorrow";

    const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <h2 style="color: #2c3e50;">Subscription Expiry Reminder</h2>
      <p>Dear ${userName || "Subscriber"},</p>
      <p>
        We wanted to remind you that your subscription will expire on 
        <strong>${formattedDate}</strong>.
      </p>
      <p>
        To continue enjoying our services without interruption, please renew your subscription before it expires.
      </p>
      <p>If you have already renewed, please ignore this email.</p>
      <p>Thank you for staying with us!</p>
      <br/>
      <p style="font-size: 12px; color: #888;">
        This is an automated reminder. Please do not reply to this email.
      </p>
    </div>
  `;

    const text = `
Subscription Expiry Reminder

Dear ${userName || "Subscriber"},

We wanted to remind you that your subscription will expire on ${formattedDate}.

To continue enjoying our services without interruption, please renew your subscription before it expires.

Renew here: https://yourapp.com/renew

If you have already renewed, please ignore this email.

Thank you for staying with us!
  `;

    return { subject, html, text };
}
