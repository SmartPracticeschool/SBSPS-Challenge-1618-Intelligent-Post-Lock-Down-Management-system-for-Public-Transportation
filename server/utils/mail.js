const nodemailer = require('nodemailer');

module.exports.sendMail = function(html){
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
        user: '',
        pass: ''
    }
    });

    // https://myaccount.google.com/lesssecureapps?pli=1

    // setup email data with unicode symbols
    let mailOptions = {
        from: '', // sender address
        to: '', // list of receivers
        subject: 'Bus Notification Alert', // Subject line
        html: html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Mail NOT Send ERROR.....",error);
            response.json({"msg":"Can't Send Mail , Some Error"});
            return console.log(error);
        }
        console.log("Mail Send SuccessFully.....");
    });
});
}