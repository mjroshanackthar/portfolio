require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Replace with your email credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mjroshanackthar@gmail.com',
        pass: 'fdfiarojqlkjfdoi' // Use an app password, not your main password
    }
});

app.post('/send', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,
            subject: `[Portfolio] ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error); // <-- Add this line
        res.status(500).json({ success: false, error: error.message });
    }
});

console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));