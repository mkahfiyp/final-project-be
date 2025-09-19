import { format } from "date-fns";

export const scheduleReminderMail = (
  name: string,
  urlLogo: string,
  note: string,
  locationOrZoom: string,
  startDate: Date,
  endDate: Date
) => {
  const formattedStart = format(new Date(startDate), "dd MMM yyyy, HH:mm");
  const formattedEnd = format(new Date(endDate), "dd MMM yyyy, HH:mm");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Interview Reminder</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f6f8;
    color: #333;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }
  .header {
    text-align: center;
    margin-bottom: 30px;
  }
  .header img {
    max-width: 160px;
  }
  .content {
    font-size: 16px;
    line-height: 1.6;
    color: #1f2937;
  }
  .content p {
    margin: 12px 0;
  }
  .highlight {
    font-weight: 600;
    color: #2563eb;
  }
  .button {
    display: inline-block;
    background-color: #2563eb;
    color: #ffffff !important;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 6px;
    margin-top: 20px;
    font-weight: 600;
  }
  .footer {
    margin-top: 30px;
    font-size: 13px;
    color: #6b7280;
    text-align: center;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${urlLogo}" alt="Company Logo" />
    </div>
    <div class="content">
      <p>Hello <strong>${name}</strong>,</p>
      <p>This is a friendly reminder that your interview is scheduled:</p>
      <p class="highlight">Location/Zoom: ${locationOrZoom}</p>
      <p class="highlight">Note: ${note || "N/A"}</p>
      <p class="highlight">Date & Time: ${formattedStart} - ${formattedEnd}</p>
      <p>We look forward to speaking with you soon!</p>
    </div>
    <div class="footer">
      <p>This is an automated reminder. Please do not reply.</p>
      <p>&copy; ${new Date().getFullYear()} Your Company</p>
    </div>
  </div>
</body>
</html>
  `;
};
