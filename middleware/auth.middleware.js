const nodemailer = require('nodemailer');

let sendverificationmail = async (email) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
          
            auth: {
                user: "salonishalu2000@gmail.com",
                pass: process.env.googlepassword ,
            },
        });
        let usermail = {

            to: email,
            subject: "Consultation request sent Successfully",
            html: `
       
        <h2>Thanks for reaching out to us. We will call you soon.</h2>
        <button>Check Out our Plans</button>
      `,
        };
     
        transporter.sendMail(usermail, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
       
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    sendverificationmail
}