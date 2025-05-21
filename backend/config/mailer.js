import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config(); 

let transporter = null; 


if (process.env.MAILJET_API_KEY && process.env.MAILJET_SECRET_KEY && process.env.MAILJET_SENDER_EMAIL) {
  transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,               
    secure: false,           
    auth: {
      user: process.env.MAILJET_API_KEY,    
      pass: process.env.MAILJET_SECRET_KEY,   
    },
  });

  console.log("Nodemailer configured for Mailjet.");

  // Verify connection (optional but good practice)
  transporter.verify((error, success) => {
    if (error) {
      console.error("Error verifying Mailjet transporter:", error);
      
    } else {
      console.log("Mailjet transporter is ready.");
    }
  });
} else {
  console.warn("Mailjet API Key, Secret Key, or Sender Email missing in .env file. Email sending will be disabled.");
}

export default transporter;