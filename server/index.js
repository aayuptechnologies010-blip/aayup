const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const { createEmailTemplate } = require('./email-template');
require('dotenv').config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Fix CORS configuration - allow specific origins dynamically
const allowedOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : [];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Email server is running' });
});

// Contact form submission
app.post('/api/send-contact-email', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Email to admin
    const adminContent = `
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #1e293b; margin: 0; font-size: 26px; font-weight: 700;">New Contact Submission</h2>
        <p style="color: #64748b; margin: 10px 0 0 0; font-size: 14px;">New message from your website</p>
      </div>

      <div style="background: #f8fafc; padding: 20px; margin: 20px 0; border-left: 3px solid #6366f1;">
        <div style="margin-bottom: 15px;">
          <div style="color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 10px;">Contact Information</div>
          <div style="background: white; padding: 15px; margin-bottom: 10px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0;">
                  <div style="font-size: 11px; color: #3f4854ff; margin-bottom: 3px;">Name</div>
                  <div style="color: #1e293b; font-weight: 600; font-size: 15px;">${name}</div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0;">
                  <div style="font-size: 11px; color: #3f4854ff; margin-bottom: 3px;">Email</div>
                  <a href="mailto:${email}" style="color: #6366f1; font-weight: 600; font-size: 15px; text-decoration: none;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0;">
                  <div style="font-size: 11px; color: #3f4854ff; margin-bottom: 3px;">Phone</div>
                  <a href="tel:${phone}" style="color: #6366f1; font-weight: 600; font-size: 15px; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              ` : ''}
            </table>
          </div>
        </div>

        <div>
          <div style="color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 10px;">Message</div>
          <div style="background: white; padding: 18px; color: #475569; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">${message}</div>
        </div>
      </div>

      <div style="text-align: center; padding: 15px; background: #eff6ff; margin-top: 20px;">
        <span style="color: #1e40af; font-size: 13px; font-weight: 600; vertical-align: middle;">
          ${new Date().toLocaleString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit'
          })}
        </span>
      </div>
    `;

    // Confirmation email to user
    const userContent = `
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #1e293b; margin: 0; font-size: 26px; font-weight: 700;">Thank You!</h2>
        <p style="color: #64748b; margin: 10px 0 0 0; font-size: 14px;">We've received your message</p>
      </div>

      <div style="text-align: center; padding: 20px; background: #f0fdf4; margin: 20px 0; border: 2px solid #86efac;">
        <p style="color: #166534; margin: 0; font-size: 16px; font-weight: 600; line-height: 1.6;">
          Hi ${name} <br/>
          <span style="font-weight: 400; font-size: 14px;">We appreciate you contacting us!</span>
        </p>
      </div>

      <div style="background: #f8fafc; padding: 20px; margin: 20px 0;">
        <div style="color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 12px;">Your Message</div>
        <div style="background: white; padding: 13px; color: #475569; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">${message}</div>
      </div>

      <div style="background: #eff6ff; padding: 20px; margin: 20px 0; border: 1px solid #93c5fd;">
        <h3 style="color: #1e40af; margin: 0 0 12px 0; font-size: 17px; font-weight: 700;">⏱️ What's Next?</h3>
        <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 14px; line-height: 1.8;">
          <li>Response within <strong>24-48 hours</strong></li>
          <li>Detailed email reply</li>
          <li>Call us: <a href="tel:+917030839883" style="color: #6366f1; text-decoration: none; font-weight: 600;">+91 70308 39883</a></li>
        </ul>
      </div>
    `;

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'Aayup.technologies.010@gmail.com',
      subject: `🔔 New Contact - ${name}`,
      html: createEmailTemplate(adminContent),
    };

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '✅ Thank you - Aayup Technologies',
      html: createEmailTemplate(userContent),
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send emails' });
  }
});

// Query/Enquiry form submission
app.post('/api/send-enquiry-email', async (req, res) => {
  try {
    const { name, email, phone, company, service_type, project_description } = req.body;

    // Email to admin
    const adminContent = `
      <div style="max-width:640px;margin:0 auto;">
        <h1 style="margin:0 0 12px 0;color:#111827;font-size:22px;font-weight:700;">New Service Enquiry</h1>
        <p style="margin:0 0 18px 0;color:#6b7280;font-size:14px;">You have received a new service enquiry from the website.</p>

        <div style="background:#f0f9ff;padding:12px;border-radius:6px;margin-bottom:14px;border-left:3px solid #4f46e5;">
          <div style="color:#1e40af;font-weight:600;font-size:15px;">Service Interest: ${service_type}</div>
        </div>

        <table role="presentation" style="width:100%;background:#f9fafb;border-radius:6px;padding:14px;border:1px solid rgba(15,23,42,0.04);">
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;width:120px;">Name</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Email</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;"><a href="mailto:${email}" style="color:#4f46e5;text-decoration:none;">${email}</a></td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Phone</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;"><a href="tel:${phone}" style="color:#4f46e5;text-decoration:none;">${phone}</a></td>
          </tr>` : ''}
          ${company ? `
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Company</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${company}</td>
          </tr>` : ''}
        </table>

        <div style="margin-top:18px;">
          <div style="font-size:13px;color:#6b7280;margin-bottom:6px;font-weight:600;text-transform:uppercase;">Project Description</div>
          <div style="background:white;border-left:3px solid #4f46e5;padding:12px;border-radius:6px;color:#0f172a;white-space:pre-wrap;">${project_description}</div>
        </div>

        <div style="margin-top:18px;color:#6b7280;font-size:13px;">
          Submitted: ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    // Confirmation email to user
    const userContent = `
      <div style="max-width:640px;margin:0 auto;text-align:left;">
        <h1 style="margin:0 0 8px 0;color:#111827;font-size:22px;font-weight:700;">Thank you, ${name}!</h1>
        <p style="margin:0 0 18px 0;color:#6b7280;font-size:14px;">We have received your enquiry about <strong>${service_type}</strong> and will respond within 24–48 hours.</p>

        <div style="background:#f8fafc;padding:14px;border-radius:6px;border:1px solid rgba(15,23,42,0.04);margin-bottom:16px;">
          <div style="font-size:13px;color:#6b7280;font-weight:600;margin-bottom:8px;">Your Enquiry Details</div>
          <div style="color:#0f172a;margin-bottom:8px;"><strong>Service:</strong> ${service_type}</div>
          <div style="color:#0f172a;white-space:pre-wrap;">${project_description}</div>
        </div>

        <p style="margin:0 0 16px 0;color:#6b7280;font-size:14px;">Our team will review your requirements and provide detailed information soon.</p>

        <a href="https://www.aayuptechnologies.com/" style="display:inline-block;padding:10px 16px;border-radius:6px;background:#4f46e5;color:#fff;text-decoration:none;font-weight:600;">Visit our website</a>
      </div>
    `;

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'Aayup.technologies.010@gmail.com',
      subject: `🔔 New Enquiry - ${service_type} - ${name}`,
      html: createEmailTemplate(adminContent),
    };

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '✅ Your Enquiry - Aayup Technologies',
      html: createEmailTemplate(userContent),
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send emails' });
  }
});

// Student application submission
app.post('/api/send-student-application-email', async (req, res) => {
  try {
    const { full_name, email, phone, college_university, degree, year_of_study, program_type } = req.body;

    // Email to admin
    const adminContent = `
      <div style="max-width:640px;margin:0 auto;">
        <h1 style="margin:0 0 12px 0;color:#111827;font-size:22px;font-weight:700;">New Student Application</h1>
        <p style="margin:0 0 18px 0;color:#6b7280;font-size:14px;">A student has applied for the ${program_type} program.</p>

        <div style="background:#f0fdf4;padding:12px;border-radius:6px;margin-bottom:14px;border-left:3px solid #10b981;">
          <div style="color:#065f46;font-weight:600;font-size:15px;">Program: ${program_type}</div>
        </div>

        <table role="presentation" style="width:100%;background:#f9fafb;border-radius:6px;padding:14px;border:1px solid rgba(15,23,42,0.04);margin-bottom:14px;">
          <tr>
            <td colspan="2" style="padding:0 0 8px 0;color:#111827;font-weight:600;border-bottom:1px solid rgba(15,23,42,0.08);">Personal Information</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;width:140px;">Name</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${full_name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Email</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;"><a href="mailto:${email}" style="color:#4f46e5;text-decoration:none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Phone</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;"><a href="tel:${phone}" style="color:#4f46e5;text-decoration:none;">${phone}</a></td>
          </tr>
        </table>

        <table role="presentation" style="width:100%;background:#f9fafb;border-radius:6px;padding:14px;border:1px solid rgba(15,23,42,0.04);margin-bottom:14px;">
          <tr>
            <td colspan="2" style="padding:0 0 8px 0;color:#111827;font-weight:600;border-bottom:1px solid rgba(15,23,42,0.08);">Academic Details</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;width:140px;">College/University</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${college_university}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Degree/Course</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${degree}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Year of Study</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${year_of_study}</td>
          </tr>
        </table>

        <div style="margin-top:18px;color:#6b7280;font-size:13px;">
          Submitted: ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    // Confirmation email to student
    const userContent = `
      <div style="max-width:640px;margin:0 auto;text-align:left;">
        <h1 style="margin:0 0 8px 0;color:#111827;font-size:22px;font-weight:700;">Application Received!</h1>
        <p style="margin:0 0 18px 0;color:#6b7280;font-size:14px;">Hi ${full_name}, thank you for applying to our <strong>${program_type}</strong> program!</p>

        <div style="background:#f8fafc;padding:14px;border-radius:6px;border:1px solid rgba(15,23,42,0.04);margin-bottom:16px;">
          <div style="font-size:13px;color:#6b7280;font-weight:600;margin-bottom:8px;">Your Application Summary</div>
          <div style="color:#0f172a;margin-bottom:4px;"><strong>Program:</strong> ${program_type}</div>
          <div style="color:#0f172a;margin-bottom:4px;"><strong>College:</strong> ${college_university}</div>
          <div style="color:#0f172a;"><strong>Course:</strong> ${degree} (${year_of_study})</div>
        </div>

        <div style="background:#eff6ff;padding:14px;border-radius:6px;margin-bottom:16px;">
          <div style="font-size:13px;color:#1e40af;font-weight:600;margin-bottom:8px;">⏱️ Next Steps</div>
          <ul style="margin:0;padding-left:20px;color:#1e40af;font-size:13px;">
            <li>Review within 48 hours</li>
            <li>Email with further instructions</li>
            <li>Check your inbox (and spam folder)</li>
          </ul>
        </div>

        <p style="margin:0 0 16px 0;color:#6b7280;font-size:14px;">Questions? Reply to this email anytime.</p>
      </div>
    `;

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'Aayup.technologies.010@gmail.com',
      subject: `🎓 New Student Enquiry - ${program_type} - ${full_name}`,
      html: createEmailTemplate(adminContent),
    };

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `✅ Your Enquiry Received - ${program_type} - Aayup Technologies`,
      html: createEmailTemplate(userContent),
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send emails' });
  }
});

// Job application submission with resume
app.post('/api/send-job-application-email', upload.single('resume'), async (req, res) => {
  try {
    const applicationData = JSON.parse(req.body.data);
    const { 
      full_name, email, phone, current_location, current_job_title, 
      total_experience, relevant_skills, linkedin_url, portfolio_url,
      cover_letter, highest_degree, university, graduation_year, job_title 
    } = applicationData;

    const resumeFile = req.file;

    // Email to admin with resume attachment
    const adminContent = `
      <div style="max-width:640px;margin:0 auto;">
        <h1 style="margin:0 0 12px 0;color:#111827;font-size:22px;font-weight:700;">New Job Application</h1>
        <p style="margin:0 0 18px 0;color:#6b7280;font-size:14px;">A candidate has applied for the ${job_title} position.</p>

        <div style="background:#fef3c7;padding:12px;border-radius:6px;margin-bottom:14px;border-left:3px solid #f59e0b;">
          <div style="color:#92400e;font-weight:600;font-size:15px;">Position: ${job_title}</div>
        </div>

        <table role="presentation" style="width:100%;background:#f9fafb;border-radius:6px;padding:14px;border:1px solid rgba(15,23,42,0.04);margin-bottom:14px;">
          <tr>
            <td colspan="2" style="padding:0 0 8px 0;color:#111827;font-weight:600;border-bottom:1px solid rgba(15,23,42,0.08);">Personal Information</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;width:150px;">Name</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${full_name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Email</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;"><a href="mailto:${email}" style="color:#4f46e5;text-decoration:none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Phone</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;"><a href="tel:${phone}" style="color:#4f46e5;text-decoration:none;">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Location</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${current_location}</td>
          </tr>
        </table>

        <table role="presentation" style="width:100%;background:#f9fafb;border-radius:6px;padding:14px;border:1px solid rgba(15,23,42,0.04);margin-bottom:14px;">
          <tr>
            <td colspan="2" style="padding:0 0 8px 0;color:#111827;font-weight:600;border-bottom:1px solid rgba(15,23,42,0.08);">Professional Details</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;width:150px;">Current Role</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${current_job_title}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Experience</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${total_experience}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Skills</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${relevant_skills}</td>
          </tr>
          ${linkedin_url ? `
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">LinkedIn</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;"><a href="${linkedin_url}" style="color:#4f46e5;text-decoration:none;">View Profile</a></td>
          </tr>` : ''}
          ${portfolio_url ? `
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Portfolio</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;"><a href="${portfolio_url}" style="color:#4f46e5;text-decoration:none;">View Portfolio</a></td>
          </tr>` : ''}
        </table>

        <table role="presentation" style="width:100%;background:#f9fafb;border-radius:6px;padding:14px;border:1px solid rgba(15,23,42,0.04);margin-bottom:14px;">
          <tr>
            <td colspan="2" style="padding:0 0 8px 0;color:#111827;font-weight:600;border-bottom:1px solid rgba(15,23,42,0.08);">Education</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;width:150px;">Degree</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${highest_degree}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">University</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${university}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Year</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${graduation_year}</td>
          </tr>
        </table>

        ${cover_letter ? `
        <div style="margin-top:18px;">
          <div style="font-size:13px;color:#6b7280;margin-bottom:6px;font-weight:600;text-transform:uppercase;">Cover Letter</div>
          <div style="background:white;border-left:3px solid #4f46e5;padding:12px;border-radius:6px;color:#0f172a;white-space:pre-wrap;">${cover_letter}</div>
        </div>` : ''}

        <div style="margin-top:18px;padding:12px;background:#fee2e2;border-radius:6px;border-left:3px solid #ef4444;">
          <div style="color:#991b1b;font-size:13px;"><strong>📎 Resume attached to this email</strong></div>
        </div>

        <div style="margin-top:18px;color:#6b7280;font-size:13px;">
          Submitted: ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    // Confirmation email to applicant
    const userContent = `
      <div style="max-width:640px;margin:0 auto;text-align:left;">
        <h1 style="margin:0 0 8px 0;color:#111827;font-size:22px;font-weight:700;">Application Received!</h1>
        <p style="margin:0 0 18px 0;color:#6b7280;font-size:14px;">Hi ${full_name}, thank you for applying for the <strong>${job_title}</strong> position!</p>

        <div style="background:#f8fafc;padding:14px;border-radius:6px;border:1px solid rgba(15,23,42,0.04);margin-bottom:16px;">
          <div style="font-size:13px;color:#6b7280;font-weight:600;margin-bottom:8px;">Application Summary</div>
          <div style="color:#0f172a;margin-bottom:4px;"><strong>Position:</strong> ${job_title}</div>
          <div style="color:#0f172a;margin-bottom:4px;"><strong>Experience:</strong> ${total_experience}</div>
          <div style="color:#0f172a;"><strong>Skills:</strong> ${relevant_skills}</div>
        </div>

        <div style="background:#eff6ff;padding:14px;border-radius:6px;margin-bottom:16px;">
          <div style="font-size:13px;color:#1e40af;font-weight:600;margin-bottom:8px;">📋 Next Steps</div>
          <ul style="margin:0;padding-left:20px;color:#1e40af;font-size:13px;">
            <li>HR team review within 5-7 business days</li>
            <li>Shortlisted candidates will be contacted</li>
            <li>Keep an eye on your email</li>
          </ul>
        </div>

        <p style="margin:0 0 16px 0;color:#6b7280;font-size:14px;">We appreciate your interest in joining our team!</p>
      </div>
    `;

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'Aayup.technologies.010@gmail.com',
      subject: `💼 New Application - ${job_title} - ${full_name}`,
      html: createEmailTemplate(adminContent),
      attachments: resumeFile ? [{
        filename: resumeFile.originalname,
        content: resumeFile.buffer
      }] : []
    };

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `✅ Application Received - ${job_title} - Aayup Technologies`,
      html: createEmailTemplate(userContent),
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send emails' });
  }
});

// Testimonial submission with image
app.post('/api/send-testimonial-email', upload.single('avatar'), async (req, res) => {
  try {
    const testimonialData = JSON.parse(req.body.data);
    const { name, email, position, testimonial, rating } = testimonialData;
    const avatarFile = req.file;

    // Email to admin
    const adminContent = `
      <div style="max-width:640px;margin:0 auto;">
        <h1 style="margin:0 0 12px 0;color:#111827;font-size:22px;font-weight:700;">New Testimonial Received</h1>
        <p style="margin:0 0 18px 0;color:#6b7280;font-size:14px;">A client has submitted feedback for review.</p>

        <div style="background:#fef3c7;padding:12px;border-radius:6px;margin-bottom:14px;border-left:3px solid #f59e0b;">
          <div style="color:#92400e;font-size:13px;"><strong>⚠️ Awaiting approval in admin panel</strong></div>
        </div>

        <table role="presentation" style="width:100%;background:#f9fafb;border-radius:6px;padding:14px;border:1px solid rgba(15,23,42,0.04);margin-bottom:14px;">
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;width:120px;">Name</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Email</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;"><a href="mailto:${email}" style="color:#4f46e5;text-decoration:none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Position</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${position}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#6b7280;">Rating</td>
            <td style="padding:8px 0;color:#0f172a;font-weight:600;">${'⭐'.repeat(rating)} (${rating}/5)</td>
          </tr>
        </table>

        <div>
          <div style="font-size:13px;color:#6b7280;margin-bottom:6px;font-weight:600;text-transform:uppercase;">Testimonial</div>
          <div style="background:white;border-left:3px solid #4f46e5;padding:12px;border-radius:6px;color:#0f172a;white-space:pre-wrap;font-style:italic;">"${testimonial}"</div>
        </div>

        ${avatarFile ? `
        <div style="margin-top:18px;padding:12px;background:#f0f9ff;border-radius:6px;border-left:3px solid #3b82f6;">
          <div style="color:#1e40af;font-size:13px;"><strong>📷 Profile picture attached to this email</strong></div>
        </div>` : ''}

        <div style="margin-top:18px;color:#6b7280;font-size:13px;">
          Submitted: ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    // Confirmation email to user
    const userContent = `
      <div style="max-width:640px;margin:0 auto;text-align:left;">
        <h1 style="margin:0 0 8px 0;color:#111827;font-size:22px;font-weight:700;">Thank You for Your Feedback!</h1>
        <p style="margin:0 0 18px 0;color:#6b7280;font-size:14px;">Hi ${name}, we truly appreciate you taking the time to share your experience!</p>

        <div style="background:#f8fafc;padding:14px;border-radius:6px;border:1px solid rgba(15,23,42,0.04);margin-bottom:16px;">
          <div style="font-size:13px;color:#6b7280;font-weight:600;margin-bottom:8px;">Your Feedback</div>
          <div style="color:#0f172a;margin-bottom:8px;"><strong>Rating:</strong> ${'⭐'.repeat(rating)} (${rating}/5)</div>
          <div style="color:#0f172a;font-style:italic;white-space:pre-wrap;">"${testimonial}"</div>
        </div>

        <div style="background:#eff6ff;padding:14px;border-radius:6px;margin-bottom:16px;">
          <div style="font-size:13px;color:#1e40af;font-weight:600;margin-bottom:8px;">📋 What Happens Next?</div>
          <ul style="margin:0;padding-left:20px;color:#1e40af;font-size:13px;">
            <li>Our team will review your feedback</li>
            <li>Once approved, it will be featured on our website</li>
            <li>You'll be notified when it goes live</li>
          </ul>
        </div>

        <p style="margin:0 0 16px 0;color:#6b7280;font-size:14px;">Thank you for being a valued part of the Aayup Technologies community!</p>
      </div>
    `;

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'Aayup.technologies.010@gmail.com',
      subject: `⭐ New Feedback - ${rating} Stars - ${name}`,
      html: createEmailTemplate(adminContent),
      attachments: avatarFile ? [{
        filename: avatarFile.originalname,
        content: avatarFile.buffer
      }] : []
    };

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '✅ Thank You for Your Feedback - Aayup Technologies',
      html: createEmailTemplate(userContent),
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send emails' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Email server running on port ${PORT}`);
  console.log(`📧 Configured email: ${process.env.EMAIL_USER}`);
  console.log(`🌐 CORS enabled for allowed origins`);
});
