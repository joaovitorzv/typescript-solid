import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer, { getTestMessageUrl } from 'nodemailer';
import Mail from "nodemailer/lib/mailer";


export class MailTrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '7a0d26273039a4',
        pass: '282c3e086f4b14'
      }
    })
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body
    });
  }
}