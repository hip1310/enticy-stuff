import * as AWS from "aws-sdk";
import * as nodemailer from "nodemailer";

// AWS SES configuration
const sesConfig = {
  accessKeyId: process.env.SES_ACCESS_KEY,
  secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
  region: process.env.SES_REGION,
};

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  SES: new AWS.SES(sesConfig),
});

// Email options
interface EmailOptions {
  //recipient email
  to: string;
  //subject of email
  subject: string;
  //message
  text: string;
}

// Send email
export const sendEmail = async (options: EmailOptions) => {
  try {
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.SES_FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      text: options.text,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`Email sent to ${options.to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
