export const rejectTemplateMail = (
  name: string,
  logoUrl: string,
  message: string
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Application Update</title>
<style>
  body { font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 40px auto; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .header { text-align: center; margin-bottom: 30px; }
  .header img { max-width: 150px; }
  .content { font-size: 16px; line-height: 1.5; }
  .footer { margin-top: 30px; font-size: 12px; color: #888; text-align: center; }
  .button { display: inline-block; background-color: #d9534f; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin-top: 20px; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${logoUrl}" alt="Company Logo" />
    </div>
    <div class="content">
      <p>Hello <strong>${name}</strong>,</p>
      <p>${message}</p>
      <p>We encourage you to apply again for future openings that match your profile.</p>
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
