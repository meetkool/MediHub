const qrcode = require('qrcode');
const Jimp = require("jimp");
const fs = require('fs');

export default async function generateQrStream(req, res) {
    try {
        const { string } = {string: 'yo'}
        const logo = "src/assets/logo.jpg";
        const filePath = 'src/assets/qrCodes/' + Math.random() + 'qr.png';

        await qrcode.toFile(filePath, string, {
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
        const textWidth = Jimp.measureText(font, string);
        qrImage.print(font, qrImage.bitmap.width / 2 - textWidth / 2, qrImage.bitmap.height - 20, string);

        await qrImage.writeAsync(filePath);

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Disposition': `attachment; filename=${filePath}`
        });
        fs.createReadStream(filePath).pipe(res);
    } catch (error) {
        //console.log(error);
        console.log(error);
        res.status(500).json({ error });
    }
}
