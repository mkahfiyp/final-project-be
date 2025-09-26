import { format } from "date-fns";

export const interviewScheduleTemplate = (
  candidateName: string,
  urlLogo: string,
  jobTitle: string,
  locationOrZoom: string,
  startDate: Date,
  endDate: Date,
  note?: string
) => {
  const formattedStart = format(new Date(startDate), "dd MMM yyyy, HH:mm");
  const formattedEnd = format(new Date(endDate), "dd MMM yyyy, HH:mm");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Interview Schedule</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f9fafb;
    color: #374151;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
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
  }
  .content p {
    margin: 12px 0;
  }
  .highlight {
    font-weight: 600;
    color: #2563eb;
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
      <p>Dear <strong>${candidateName}</strong>,</p>
      <p>We are pleased to inform you that your interview has been scheduled with our team.</p>
      <p><span class="highlight">Job Title:</span> ${jobTitle}</p>
      <p><span class="highlight">Location/Zoom:</span> ${locationOrZoom}</p>
      <p><span class="highlight">Date & Time:</span> ${formattedStart} - ${formattedEnd}</p>
      <p><span class="highlight">Additional Notes:</span> ${note || "N/A"}</p>
      <p>Please make sure to be available on time. We look forward to meeting you.</p>
    </div>
    <div class="footer">
      <p>This is an automated message. Please do not reply.</p>
      <p>&copy; ${new Date().getFullYear()} Your Company</p>
    </div>
  </div>
</body>
</html>
  `;
};
