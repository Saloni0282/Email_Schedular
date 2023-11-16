const nodemailer = require('nodemailer');
const { EmailModel } = require('../models/user.model');
const { sendverificationmail }=require("../middleware/auth.middleware")

const AllEmail = async (req, res) => {
    try {
        const emails = await EmailModel.find();
        res.json(emails);
    } catch (error) {
        res.status(500).json({ error: 'An Error Occured While Retrieving Email Status' });
    }
}

const scheduleEmail = async (req, res) => {
    try {
        if (!req.body.email || !req.body.scheduledTime || !req.body.subject || !req.body.body) {
            return res.status(400).json({ error: 'Invalid Request' });
        }

        // Create an email document
        const email = new EmailModel({
            email: req.body.email,
            scheduledTime: new Date(req.body.scheduledTime),
            subject: req.body.subject,
            body: req.body.body,
            status: 'Scheduled',
        });
        await email.save();

        // Schedule email delivery using Nodemailer
        // const transporter = nodemailer.createTransport({
        //     service: 'Gmail',
        //     auth: {
        //         user: 'salonishalu2000@gmail.com',
        //         pass: process.env.pass
        //     }
        // });
        sendverificationmail(req.body.email)
        // Function to send the scheduled email
        // const sendEmail = (email) => {
        //     // console.log(1000, email)
        //     const mailOptions = {
        //         from: 'salonishalu2000@gmail.com',
        //         to: email.email,
        //         subject: email.subject,
        //         text: email.body,
        //     };

        //     transporter.sendMail(mailOptions, (error, info) => {
        //         if (error) {
        //             console.error('Email Delivery Failed:', error);
        //             email.status = 'Failed';
        //         } else {
        //             console.log('Email Delivered:', info.response);
        //             email.status = 'Sent';
        //         }
        //         // email.save();
        //     });
        // };
        // sendEmail(req.body.email);
        // const now = new Date();
        // const emails = await EmailModel.find({ status: 'Scheduled', scheduledTime: { $lte: now } });
        // emails.forEach(sendEmail);

        res.json({ message: 'Email Scheduled Successfully!!!!' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    AllEmail,scheduleEmail
}