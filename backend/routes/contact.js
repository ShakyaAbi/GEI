import express from 'express';
import nodemailer from 'nodemailer';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 submissions per 15 minutes per IP
  message: { error: true, message: 'Too many contact form submissions. Please try again later.' }
});

// Configure nodemailer transporter
const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP configuration missing. Contact form emails will not be sent.');
    return null;
  }

  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Contact form submission
router.post('/', contactLimiter, [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters long'),
  body('organization').optional().trim()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ error: true, message: errorMessages });
  }

  try {
    const { firstName, lastName, email, organization, subject, message } = req.body;
    
    const transporter = createTransporter();
    
    if (!transporter) {
      // Log the submission but don't send email
      console.log('Contact form submission (email not configured):', {
        name: `${firstName} ${lastName}`,
        email,
        organization,
        subject,
        message: message.substring(0, 100) + '...'
      });
      
      return res.json({ 
        error: false, 
        message: 'Thank you for your message. We will get back to you soon!' 
      });
    }

    // Email to admin
    const adminEmailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER || 'info@gei.org',
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toISOString()}</small></p>
      `
    };

    // Auto-reply to user
    const userEmailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for contacting GEI',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Dear ${firstName},</p>
        <p>We have received your message regarding "${subject}" and will get back to you within 24-48 hours.</p>
        <p>Your message:</p>
        <blockquote style="border-left: 4px solid #0066cc; padding-left: 16px; margin: 16px 0; color: #666;">
          ${message.replace(/\n/g, '<br>')}
        </blockquote>
        <p>Best regards,<br>The GEI Team</p>
        <hr>
        <p><small>Global Environmental Initiative<br>
        Email: info@gei.org<br>
        Website: https://gei.org</small></p>
      `
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(adminEmailOptions),
      transporter.sendMail(userEmailOptions)
    ]);

    res.json({ 
      error: false, 
      message: 'Thank you for your message. We will get back to you soon!' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Collaboration form submission
router.post('/collaborate', contactLimiter, [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('type').trim().notEmpty().withMessage('Collaboration type is required'),
  body('message').trim().isLength({ min: 20 }).withMessage('Message must be at least 20 characters long'),
  body('organization').optional().trim()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ error: true, message: errorMessages });
  }

  try {
    const { name, email, organization, type, message } = req.body;
    
    const transporter = createTransporter();
    
    if (!transporter) {
      console.log('Collaboration form submission (email not configured):', {
        name,
        email,
        organization,
        type,
        message: message.substring(0, 100) + '...'
      });
      
      return res.json({ 
        error: false, 
        message: 'Thank you for your collaboration interest. We will contact you soon!' 
      });
    }

    // Email to admin
    const adminEmailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER || 'partnerships@gei.org',
      subject: `Collaboration Request: ${type}`,
      html: `
        <h2>New Collaboration Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ''}
        <p><strong>Collaboration Type:</strong> ${type}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toISOString()}</small></p>
      `
    };

    // Auto-reply to user
    const userEmailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for your collaboration interest - GEI',
      html: `
        <h2>Thank you for your collaboration interest!</h2>
        <p>Dear ${name},</p>
        <p>We have received your collaboration request for "${type}" and are excited about the potential partnership.</p>
        <p>Our partnerships team will review your proposal and get back to you within 3-5 business days.</p>
        <p>Your message:</p>
        <blockquote style="border-left: 4px solid #0066cc; padding-left: 16px; margin: 16px 0; color: #666;">
          ${message.replace(/\n/g, '<br>')}
        </blockquote>
        <p>Best regards,<br>The GEI Partnerships Team</p>
        <hr>
        <p><small>Global Environmental Initiative<br>
        Email: partnerships@gei.org<br>
        Website: https://gei.org</small></p>
      `
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(adminEmailOptions),
      transporter.sendMail(userEmailOptions)
    ]);

    res.json({ 
      error: false, 
      message: 'Thank you for your collaboration interest. We will contact you soon!' 
    });

  } catch (error) {
    console.error('Collaboration form error:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Failed to send collaboration request. Please try again later.' 
    });
  }
});

export default router;