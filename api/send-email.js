import nodemailer from 'nodemailer';

const SERVICE_LABELS = {
  'outdoor-cooling': 'Outdoor Cooling Design and Build',
  'engineering-services': 'Engineering Services for Existing Buildings',
  'mep-services': 'MEP Services for New Buildings',
  'district-cooling': 'District-Cooling Solutions',
  'cooling-as-service': 'Cooling as a Service',
  'modeling': 'Modeling Services',
  'sustainability': 'Sustainability & Decarbonization',
  'digitalization': 'Digitalization & Smart Systems',
  'data-centers': 'Data Centers-Specific Services',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, company, email, phone, relatedService } = req.body || {};

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  console.log(process.env.SMTP_USER);
  console.log(process.env.SMTP_PASS);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    return res.status(500).json({ error: 'SMTP credentials are not configured' });
  }

  const serviceName = SERVICE_LABELS[relatedService] || relatedService || '-';

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"RACS Website" <${smtpUser}>`,
      to: 'info@reefacs.ae',
      cc: 'it.reef@reefdevelopments.ae',
      subject: 'New consultation request from RACS website',
      text: [
        `Name: ${name}`,
        `Company: ${company || '-'}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Related Service: ${serviceName}`,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #104b86; border-bottom: 2px solid #104b86; padding-bottom: 12px;">
            New Consultation Request
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; color: #334155; width: 160px; border-bottom: 1px solid #e2e8f0;">Name</td>
              <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; color: #334155; border-bottom: 1px solid #e2e8f0;">Company</td>
              <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${company || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; color: #334155; border-bottom: 1px solid #e2e8f0;">Email</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0;">
                <a href="mailto:${email}" style="color: #104b86;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; color: #334155; border-bottom: 1px solid #e2e8f0;">Phone</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0;">
                <a href="tel:${phone}" style="color: #104b86;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; color: #334155; border-bottom: 1px solid #e2e8f0;">Related Service</td>
              <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${serviceName}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">
            Submitted via reefacs.ae
          </p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error sending email', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
