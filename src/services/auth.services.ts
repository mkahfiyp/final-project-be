import { transport } from "../config/nodemailer";
import { regisMailTemplate } from "../templates/regist.template";

export const regisService = async (data: any) => {
    // const newUser = await createAccount(data);

    //  Create token for verify
    // const token = createToken(newUser, "15m");

    // Define url to front end verify page
    // const urlToFE = `${process.env.FE_URL}/verify/${token}`;

    await transport.sendMail({
        from: process.env.MAILSENDER,
        to: data.email,
        subject: "Verifikasi email",
        html: regisMailTemplate(data.username, "http://localhost:5005/verify"),
    });

    return data;
}