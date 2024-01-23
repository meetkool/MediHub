const qrcode = require('qrcode');
const Jimp = require("jimp");
const nodemailer = require("nodemailer");
const fs = require('fs');

require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  pool: true,
  auth: {
    user: process.env.NEXT_EMAIL,
    pass: process.env.NEXT_EMAIL_PASSWORD,
  },
});

export default async function generateAndSendQrCode(req, res) {
    try {
        const { name, email, id } = req.body;

        const logo = "src/assets/logo.jpg";
        const filePath = 'src/assets/qrCodes/' + Math.random() + 'qr.png';

        await qrcode.toFile(filePath, id, {
            color: {
                dark: '#000000',
                light: '#FFFFFF',
            },
            scale: 11, margin: 2
        });

        const qrImage = await Jimp.read(filePath);
        const attachment = await Jimp.read(logo);
        attachment.resize(qrImage.bitmap.width / 4.1, qrImage.bitmap.height / 4.1); //4.1
        // qrImage.composite(attachment, qrImage.bitmap.width / 2.6, qrImage.bitmap.height / 2.6);

        const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        // Font, X coordinate, Y coordinate for the String
        const textWidth = Jimp.measureText(font, id);
        qrImage.print(font, qrImage.bitmap.width / 2 - textWidth / 2, qrImage.bitmap.height - 20, id);

        await qrImage.writeAsync(filePath);

        const mailOptions = {
            from: "mail@ezycare.in",
            to: email,
            subject: "Your QR code for registration",
            text: `Dear ${name},\n\nPlease find your QR code for registration attached.\n\nThank You for registering with EzyCare`,
            attachments: [
                {
                    filename: 'qr.png',
                    path: filePath,
                },
            ],
        };

        await transporter.sendMail(mailOptions);

        fs.unlinkSync(filePath);

        console.log(`Sent QR code for id ${id} to ${email}`);
        res.status(200).send(`Sent QR code for id ${id} to ${email}`);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}
