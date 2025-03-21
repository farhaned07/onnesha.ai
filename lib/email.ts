import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  // Check if SMTP settings exist
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('SMTP settings not found, using console instead for development');
    
    // Log email to console in development
    console.log('========== EMAIL SENT ==========');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Text: ${text}`);
    if (html) {
      console.log(`HTML: ${html.substring(0, 100)}...`);
    }
    console.log('===============================');
    
    // Return early in development mode
    return;
  }
  
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  
  // Send email
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || 'Onnesha AI Assistant <noreply@onnesha.ai>',
    to,
    subject,
    text,
    html: html || text,
  });
  
  return info;
} 