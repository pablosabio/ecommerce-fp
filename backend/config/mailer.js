// backend/config/mailer.js
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config(); // Ensure environment variables are loaded

let transporter = null; // Initialize as null

// Ensure Mailjet variables exist in .env file
if (process.env.MAILJET_API_KEY && process.env.MAILJET_SECRET_KEY && process.env.MAILJET_SENDER_EMAIL) {
  transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com', // Mailjet SMTP server
    port: 587,               // Recommended port
    secure: false,           // Use STARTTLS (false for port 587)
    auth: {
      user: process.env.MAILJET_API_KEY,    // API Key
      pass: process.env.MAILJET_SECRET_KEY,   // Secret Key
    },
  });

  console.log("Nodemailer configured for Mailjet.");

  // Verify connection (optional but good practice)
  transporter.verify((error, success) => {
    if (error) {
      console.error("Error verifying Mailjet transporter:", error);
      // You can handle critical errors here, e.g., setting transporter back to null
      // transporter = null;
    } else {
      console.log("Mailjet transporter is ready.");
    }
  });
} else {
  console.warn("Mailjet API Key, Secret Key, or Sender Email missing in .env file. Email sending will be disabled.");
  // Transporter will remain null
}

// Export the configured transporter (or null if configuration failed)
export default transporter;