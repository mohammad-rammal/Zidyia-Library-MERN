"use strict";

const nodemailer = require("nodemailer");

module.exports = async (userEmail, subject, htmlTemplate) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            secure: false,
            auth: {
                user: "api",
                pass: "cbcb160820f88f72378d9912f80df69b",
            },
        });
        const mailOptions = {
            from: "mailtrap@demomailtrap.com",
            to: userEmail,
            subject: subject,
            html: htmlTemplate,
        }

        const info = await transporter.sendMail(mailOptions);
        console.log("Email Sent: " + info.response);

    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Problem (NodeMailer)")
    }
}


// async function notifyAdmin() {
//     const transporter = nodemailer.createTransport({
//         host: "live.smtp.mailtrap.io",
//         port: 587,
//         secure: false,
//         auth: {
//             user: "api",
//             pass: "e36bf2f7b7545507eb7977dad2049c44",
//         },
//     });

//     const info = await transporter.sendMail({
//         from: 'mailtrap@demomailtrap.com', // Update this with your Mailtrap email
//         to: "librarymanager@bk.ru",
//         subject: "Hello ✔✔✔✔",
//         text: "Hello world?",
//         html: "<b>Hello world?</b>",
//     });

//     console.log("Message sent: %s", info.messageId);
// }


// async function main() {
//     try {
//         await notifyAdmin();
//     } catch (error) {
//         console.log(error);
//         throw new Error("Internal Server Error From Nodemailer.");
//     }
// }

// // Call the main function to trigger email sending
// main();
