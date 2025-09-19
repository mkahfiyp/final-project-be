export const acceptTemplateMail = (
  message: string,
  name: string,
  logoUrl: string
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Application Accepted</title>
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; color: #333; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
  .header { text-align: center; margin-bottom: 30px; }
  .header img { max-width: 160px; }
  .content { font-size: 16px; line-height: 1.6; color: #555; }
  .content p { margin: 15px 0; }
  .button { display: inline-block; background-color: #4CAF50; color: #fff; font-weight: bold; padding: 12px 25px; border-radius: 6px; text-decoration: none; margin-top: 20px; transition: background-color 0.3s ease; }
  .button:hover { background-color: #45a049; }
  .footer { margin-top: 35px; font-size: 12px; color: #999; text-align: center; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${logoUrl}" alt="Company Logo" />
    </div>
    <div class="content">
      <p>Hi <strong>${name}</strong>,</p>
      <p>${message}</p>
      <p>We are thrilled to have you join our team!</p>
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
