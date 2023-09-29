import { injectable } from "tsyringe";
import nodemailer from "nodemailer";
import { SMTP_EMAIL, SMTP_HOST, SMTP_PASSWORD } from "../../../../constants";

@injectable()
export class EmailRepository {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: 587,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  sendEmail(to: string, subject: string, body: string) {
    return this.transporter.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
  }
}
