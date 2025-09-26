import axios from "axios";
// import { OAuth2Client } from "google-auth-library";

// export const getPayloadGoogle = async (idToken: string) => {
//   const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//   const ticket = await client.verifyIdToken({
//     idToken,
//     audience: process.env.GOOGLE_CLIENT_ID,
//   });
//   const payload = ticket.getPayload();

//   return payload;
// };

export const getDataFromGoogle = async (access_token: string) => {
  const { data } = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
  return data;
};
