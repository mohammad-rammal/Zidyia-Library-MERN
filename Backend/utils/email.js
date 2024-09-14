const nodemailer = require("nodemailer");

module.exports = async (userEmail, subject, htmlTemplate) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465, // or 587 for TLS
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false // Add this line to trust self-signed certificate
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: userEmail,
            subject: subject,
            html: htmlTemplate,
        }
        const info = await transporter.sendMail(mailOptions);
        console.log("Email Sent: " + info.response);
    } catch (error) {
        console.log("Error sending email:", error);
throw new Error("Internal Server Problem (NodeMailer): " + error.message)
    }
}