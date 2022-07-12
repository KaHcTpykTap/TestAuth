const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      /* service: "Gmail", */
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {

    console.log(to);
    console.log(link);

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Account Activation " + process.env.API_URL,
      text: "hello",

      html: `
            <div>
              <h1>To activate follow the link</h1>
              <a href="${link}">${link}</a>
            </div>
        `,
    });
  }
}

module.exports = new MailService();
