import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILSENDER,
        pass: process.env.MAILPASS,
    },
});
