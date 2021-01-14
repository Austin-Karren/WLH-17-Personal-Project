const nodemailer = require('nodemailer'),
      {EMAIL, PASSWORD} = process.env;

module.exports = {
   email: async(req, res) => {
      const {firstName, lastName, email, interest} = req.body;
      try {
         let transporter = nodemailer.createTransport({
            // host: 'smtp.mail.yahoo.com',
            host: 'smtp.gmail.com',
            // port: 465,
            port: 587,
            // service: 'yahoo',
            service: 'gmail',
            secure: false,
            requireTLS: true, //gmail only
            auth: {
               user: EMAIL,
               pass: PASSWORD
            }
         });
         let info = await transporter.sendMail({
            from: `Kylie England @ Ky England Photo <${EMAIL}>`,
            to: `${firstName} ${lastName} <${email}>`,
            bcc: `Kylie England <${EMAIL}>`,
            subject: `Thanks for reaching out!`,
            text: `Hi ${firstName} ${lastName}, Thanks for reaching out to Kylie about "${interest}." I will get back to you soon!`,
            // html: '<div>This is a nodemailer test</div>'
            //attachments: [
               // {fileName: name_of_file, path: file_path}
            //]
         }, (err, res) => {
            if(err) {
               console.log(err)
            } else {
               res.sendStatus(200);
            }
         })
      } catch(err) {
         res.status(500).send(err);
      }
   }
}