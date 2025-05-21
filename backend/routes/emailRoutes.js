// backend/routes/emailRoutes.js
import express from 'express';
// Import the configured transporter from the config file
import transporter from '../config/mailer.js';

// Create a new Router instance
const router = express.Router();

// Define email sending route
// The actual path will be POST /api/email/send (based on how it's used in server.js)
router.post('/send', async (req, res) => {
  // Check if transporter was successfully configured on startup
  if (!transporter) {
    console.error(
      'Attempted to send email, but email service is not configured or failed verification.'
    );
    // 503 Service Unavailable is appropriate here
    return res.status(503).json({ message: 'Email service is unavailable.' });
  }

  // Extract data from request body
  const { to, subject, text, html } = req.body;

  // Basic input validation
  if (!to || !subject || (!text && !html)) {
    return res
      .status(400)
      .json({ message: 'Missing required email fields: to, subject, and text or html body' });
  }

  // Configure mail options
  const mailOptions = {
    from: `"Your Website Name" <${process.env.MAILJET_SENDER_EMAIL}>`, // Use the verified sender email
    to: to, // Recipient(s)
    subject: subject, // Subject
    text: text, // Plain text body (optional)
    html: html, // HTML body (optional)
  };

  // Attempt to send the email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent via Mailjet: %s', info.messageId);
    res.status(200).json({ message: 'Email sent successfully!', messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email via Mailjet:', error);
    res.status(500).json({ message: 'Failed to send email.', error: error.message });
  }
});

// You can add other email-related routes here later (e.g., /templates, /status)

// Export the router for use in server.js
export default router;
