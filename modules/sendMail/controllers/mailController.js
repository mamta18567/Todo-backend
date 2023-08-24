const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendMail = async(email)=>{
    // building a connection with smtp
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    let emailData = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Sending my first email",
        html: "<h1>You are now Registered</h1>"
    })
}
