export const regisMailTemplate = (
  username: string,
  urlToFE: string,
  logoUrl: string
) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>Email Verification</title>
    <link href="https://fonts.googleapis.com/css?family=Inter:400,600&display=swap" rel="stylesheet" />
    <style>
      * {
        font-family: Inter, -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      }
      body {
        background-color: #f9fafb;
        margin: 0;
        padding: 0;
        color: #1a1a1a;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        padding: 40px;
      }
      .logo {
        text-align: center;
        margin-bottom: 24px;
      }
      .logo img {
        max-height: 50px;
      }
      .title {
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 12px;
      }
      .subtitle {
        font-size: 16px;
        color: #4b5563;
        margin-bottom: 24px;
      }
      .btn {
        display: inline-block;
        background-color: #111827;
        color: #ffffff !important;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        margin-top: 20px;
      }
      .divider {
        height: 1px;
        background-color: #e5e7eb;
        margin: 32px 0;
      }
      .footer {
        font-size: 13px;
        color: #6b7280;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img src="${logoUrl}" alt="YourApp Logo" />
      </div>
      <p class="title">Hi ${username},</p>
      <p class="subtitle">
        Thanks for signing up! Please confirm your email address by clicking the button below:
      </p>

      <a href="${urlToFE}" class="btn" target="_blank">Confirm My Account</a>

      <div class="divider"></div>

      <p class="footer">
        If you didn’t create an account, you can safely ignore this email.<br/>
        © ${new Date().getFullYear()} YourApp. All rights reserved.
      </p>
    </div>
  </body>
</html>
`;
};
