export const regisMailTemplate = (username: string, urlToFE: string) => {
    return (
        `<!DOCTYPE html>
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />

    <!--[if !mso]>

<!-->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />

    <!--<![endif]-->

    <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->

    <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
        body {
          width: 600px;
          margin: 0 auto;
        }
        table {
          border-collapse: collapse;
        }
        table,
        td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          -ms-interpolation-mode: bicubic;
        }
      </style>
    <![endif]-->
    <style type="text/css">
      body,
      p,
      div {
        font-family: inherit;
        font-size: 20px;
      }
      body {
        color: #1a1a1a;
      }
      body a {
        color: #1188e6;
        text-decoration: none;
      }
      p {
        margin: 0;
        padding: 0;
      }
      table.wrapper {
        width: 100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      ul ul ul ul {
        list-style-type: disc !important;
      }
      ol ol {
        list-style-type: lower-roman !important;
      }
      ol ol ol {
        list-style-type: lower-latin !important;
      }
      ol ol ol ol {
        list-style-type: decimal !important;
      }
      @media screen and (max-width: 480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .social-icon-column {
          display: inline-block !important;
        }
        .border-container {
          border-width: 0 !important;
          padding: 0 10px 10px !important;
        }
      }
    </style>
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <meta name="color-scheme" content="only" />
    <link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet" />
    <style>
      * {
        font-family: Inter, -apple-system, BlinkMacSystemFont, Roboto, Helvetica,
          Arial, sans-serif;
      }
      @media (max-width: 480px) {
        .wrapper-mobile {
          padding: 4px 1px;
        }
      }
      @media (max-width: 500px) {
        .heading {
          display: block;
          font-size: 18px !important;
          line-height: 1.4 !important;
        }
        .subheading {
          display: block;
          font-size: 16px !important;
          line-height: 1.4 !important;
        }
        .inner-td a {
          width: 100%;
          box-sizing: border-box;
        }
        .cta {
          width: 100%;
          box-sizing: border-box;
        }
      }
    </style>
  </head>
  <body>
    <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:20px; font-family:inherit; color:#1A1A1A; background-color:#FFFFFF;">
      <div class="webkit" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
          <tr>
            <td valign="top" bgcolor="#FFFFFF" width="100%">
              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 40px 0">
                      <tr>
                        <td>

                          <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 650px" align="center">
                            <tr>
                              <td role="modules-container" style="
                                  border-radius: 12px;
                                  border: 1px solid #e1e1e1;
                                  padding: 48px;
                                  color: #1a1a1a;
                                  text-align: left;
                                " bgcolor="#FFFFFF" width="100%" align="left" class="border-container">
                                <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="
                                    display: none !important;
                                    mso-hide: all;
                                    visibility: hidden;
                                    opacity: 0;
                                    color: transparent;
                                    height: 0;
                                    width: 0;
                                  ">
                                  <tr>
                                    <td role="module-content">
                                      <p>Activate your account by verifying your email address.</p>
                                    </td>
                                  </tr>
                                </table>
                                <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed" data-muid="b53d5774-dba2-4e73-bdbc-1a82e47dc2e2">
                                  <tbody>
                                    <tr>
                                      <td style="
                                          font-size: 6px;
                                          line-height: 10px;
                                          padding: 0 0 32px;
                                        " valign="top" align="left">
                                        <a href="https://url2790.tome.app/ls/click?upn=t0u97nSgPG80nzbFGb-2F3Veyab3YsmEi6Hm7xp8BTZTc-3DNuqe_MdsEd36FX9U0t9iH2JiVQvU1cjQ81Beg-2BLA1ZqT2D08ilaK5q9vTz-2FCGu0i64qwix2ystH1LTgtkIjH0ZgMo0X23yh4Qd-2B0CdQ-2BvCe08Y7YaDHvLzyyV5WDTzKoKGISiPtnPCK-2FohhDYOQ-2FixaUmOt83nLr-2FDL9LhRcLDMfrWpR6dC4yBDK8wJokcloHQkEvTLmZbqaDAolEB91WCh5tpQ-3D-3D" style="text-decoration: none;"><img class="max-width" border="0" style="
                                              display: block;
                                              color: #000;
                                              font-family: Inter, -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;font-family: SF Pro Text;
                                              font-size: 16px;
                                            " width="50" alt="Go to Tome" data-proportionally-constrained="true" data-responsive="false" src="https://cdn.mcauto-images-production.sendgrid.net/374a5db4340c8b32/59ca82b0-52dc-4d1d-aced-1b5e62bc99f6/168x168.png" height="50" /></a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed" data-muid="1b4214ca-0d1e-4b20-bc7c-0aeb1ff69a12" data-mc-module-version="2019-10-22">
                                  <tbody>
                                    <tr>
                                      <td style="
                                          padding: 0;
                                          line-height: 30px;
                                          text-align: inherit;
                                        " height="100%" valign="top" bgcolor="" role="module-content">
                                        <b style="
                                            font-size: 24px;
                                            font-weight: 600;
                                            font-family: system-ui, -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
                                            letter-spacing: -0.4px;
                                            line-height: 1.15;
                                          " class="heading">Verify your email</b>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table class="module" role="module" data-type="code" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; padding-top: 16px;" data-muid="89559209-c900-410f-85bf-431ab6df15b7">
                                  <tbody>
                                    <tr>
                                      <td height="100%" valign="top" role="module-content">
                                        <span
                                          class="subheading"
                                          style="
                                            color: #808080;
                                            font-size: 20px;
                                            line-height: 26px;
                                            display: block;
                                            font-style: normal;
                                            font-variant-ligatures: normal;
                                            font-variant-caps: normal;
                                            font-weight: 400;
                                            letter-spacing: normal;
                                            orphans: 2;
                                            text-indent: 0;
                                            text-transform: none;
                                            widows: 2;
                                            word-spacing: 0;
                                            -webkit-text-stroke-width: 0;
                                            text-decoration-thickness: initial;
                                            text-decoration-style: initial;
                                            text-decoration-color: initial;
                                            font-family: inherit;
"
                                        >
                                          Please verify your email address by clicking the link below.
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout: fixed" width="100%" data-muid="a983ad21-e313-4842-821d-fcbda6cad0df">
                                  <tbody>
                                    <tr>
                                      <td align="left" bgcolor="" class="outer-td" style="padding: 24px 0 0 0">
                                        <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align: center">
                                          <tbody>
                                            <tr>
                                              <td align="center" bgcolor="#090909" class="inner-td" style="
                                                  border-radius: 6px;
                                                  text-align: left;
                                                  background-color: inherit;
                                                ">
                                                <a href="#" style="
                                                    background-color: #090909;
                                                    border: 1px solid #333;
                                                    border-radius: 12px;
                                                    color: #fff;
                                                    display: inline-block;
                                                    font-size: 15px;
                                                    font-family: inherit;
                                                    font-weight: 700;
                                                    letter-spacing: 0;
                                                    line-height: normal;
                                                    padding: 11px;
                                                    box-sizing: border-box;
                                                    text-align: center;
                                                    text-decoration: none;
                                                    width: 218px;
                                                    font-family: system-ui, -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
                                                  " target="_blank">Confirm my account</a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed" data-muid="733f88d6-af18-426b-a3d8-b5935e3fe0a5">
                                  <tbody>
                                    <tr>
                                      <td style="padding: 0 0 32px" role="module-content"></td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed" data-muid="ff37b1de-cc7d-4956-b5a3-2bbd67e6ea7c" data-mc-module-version="2019-10-22">
                                  <tbody>
                                    <tr>
                                      <td style="
                                          text-align: left;
                                          line-height: 16px;
                                          text-align: inherit;
                                        " height="100%" valign="top" bgcolor="" role="module-content">
                                        <div style="
                                            background-color: #e1e1e1;
                                            height: 1px;
                                            width: 100%;
                                          "></div>
                                        <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed">
                                          <tbody>
                                            <tr>
                                              <td style="
                                                  padding-bottom: 16px;
                                                " role="module-content" bgcolor=""></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <div style="
                                            color: #838383;
                                            font-size: 13px;
                                            line-height: 16px;
                                          ">Effortlessly build a presentation using videos, prototypes, embeds, and more. From product reviews to quick ideas—pull it all together in seconds with <a href="https://url2790.tome.app/ls/click?upn=t0u97nSgPG80nzbFGb-2F3Veyab3YsmEi6Hm7xp8BTZTc-3DEJz8_MdsEd36FX9U0t9iH2JiVQvU1cjQ81Beg-2BLA1ZqT2D08ilaK5q9vTz-2FCGu0i64qwiyleR4HbZv425iqwI6Mdu3erMY6pHVRDK154hif5jy5iep2AYyhPq8cnou3SCe-2FJ8M3ImmvHQIGShZyeGWwEFqmMf12PQp5K4abeJ2aFepT-2BQ8cm0DPu-2FBQvEhU-2FL-2B2haD4-2FgHv4MyUBetvxm4rhNHQ-3D-3D" style="color: inherit !important; text-decoration: none !important;">Tome</a>.&nbsp;<a href="https://url2790.tome.app/ls/click?upn=t0u97nSgPG80nzbFGb-2F3Veyab3YsmEi6Hm7xp8BTZTc-3DOfHF_MdsEd36FX9U0t9iH2JiVQvU1cjQ81Beg-2BLA1ZqT2D08ilaK5q9vTz-2FCGu0i64qwiNsJii9iHGC5vggUirT-2B6Dkpz-2FOAY2ASih70ue0TzJuTYYyefHks6H8-2FM8CrMnhy-2BdcdEolWJBqz6m78Gz8GZM0-2F9e8jci5Ec10r1uw1Gk5LbFTGS0lpr0Dw6H9i0PelHNuirbzlWi2QilqnGpZHemQ-3D-3D" style="color: inherit !important; text-decoration: underline !important;">Learn more</a>.<br><br>Designed and built in San Francisco, CA</a></div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </table>

                          <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
`
    )
}