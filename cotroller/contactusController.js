const nodemailer = require("nodemailer");
require("dotenv").config()



const contactUsController = async (req, res) => {
    const { fullName, message, subject, email } = req.body
    console.log(req.body)


    const transporter = nodemailer.createTransport({

        service: process.env.EMAIL_HOST,

        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });

    const emailMessage = await transporter.sendMail({
        from: email,
        to: process.env.USER,
        subject: `Message from ${email}: ${subject}`,
        text: message
    });
    transporter.sendMail(emailMessage, (err, msg) => {
        if (err) {
            res.status(403).json({ err: "email not sent" })
        }
        if (msg) {
            res.json({ msg: msg.response });
            console.log(msg.response)
        }
    })


}

module.exports = { contactUsController }