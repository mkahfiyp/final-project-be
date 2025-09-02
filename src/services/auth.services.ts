import { transport } from "../config/nodemailer";
import { createAccount } from "../repositories/auth.repository";
import { regisMailTemplate } from "../templates/regist.template";
import { createToken } from "../utils/createToken";

export const regisService = async (data: any) => {
    const newUser = await createAccount(data);

    //  Create token for verify
    const token = createToken(newUser, "15m");

    // Define url to front end verify page
    const urlToFE = `${process.env.FE_URL}/verify/${token}`;
    

    await transport.sendMail({
        from: process.env.MAILSENDER,
        to: data.email,
        subject: "Verifikasi email",
        html: regisMailTemplate(data.username, urlToFE),
    });

    return newUser;
}