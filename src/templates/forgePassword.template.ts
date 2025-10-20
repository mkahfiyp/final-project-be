export const forgetPasswordMail = (
  username: string,
  urlToFE: string,
  logoUrl: string
) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reset Your Password</title>
    </head>
    <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f9fafb; color:#111827;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f9fafb; padding:20px 0;">
        <tr>
          <td align="center">
            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
              <!-- Logo -->
              <tr>
                <td align="center" style="padding:24px;">
                  <img src="${logoUrl}" alt="Logo" width="120" style="display:block;" />
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td style="padding:0 32px 32px 32px; text-align:left;">
                  <h2 style="color:#111827; font-size:22px; margin:0 0 16px 0;">Hi ${username},</h2>
                  <p style="color:#374151; font-size:15px; line-height:1.6; margin:0 0 24px 0;">
                    We received a request to reset your password. Click the button below to set a new password:
                  </p>
                  <div style="text-align:center; margin:24px 0;">
                    <a href="${urlToFE}" target="_blank" style="background-color:#4f46e5; color:#ffffff; padding:12px 24px; border-radius:6px; text-decoration:none; font-size:15px; font-weight:bold; display:inline-block;">
                      Reset Password
                    </a>
                  </div>
                  <p style="color:#6b7280; font-size:13px; line-height:1.6; margin:0 0 8px 0;">
                    If you didn’t request this, you can safely ignore this email.
                  </p>
                  <p style="color:#6b7280; font-size:13px; line-height:1.6; margin:0;">
                    This link will expire in 15 minutes for your security.
                  </p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td align="center" style="padding:20px; background-color:#f3f4f6; font-size:12px; color:#9ca3af;">
                  © ${new Date().getFullYear()} Your Company. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
