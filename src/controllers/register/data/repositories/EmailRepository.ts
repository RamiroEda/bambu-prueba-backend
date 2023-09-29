import { singleton } from "tsyringe";
import nodemailer from "nodemailer";
import { SMTP_EMAIL, SMTP_HOST, SMTP_PASSWORD } from "../../../../constants";

/**
 * Repositorio para el envío de emails.
 */
@singleton()
export class EmailRepository {
  /**
   * Transportador de emails.
   */
  private transporter = nodemailer.createTransport({
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

  /**
   * Envía un email.
   * @param to Email del destinatario.
   * @param subject Asunto del email.
   * @param body Cuerpo del email.
   */
  sendEmail(to: string, subject: string, body: string) {
    return this.transporter.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
  }
}
