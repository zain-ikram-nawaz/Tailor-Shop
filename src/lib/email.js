import nodemailer from 'nodemailer';

const SMTP_CONFIGURED =
  process.env.SMTP_USER && process.env.SMTP_PASS &&
  process.env.SMTP_USER !== 'your-gmail@gmail.com';

const transporter = SMTP_CONFIGURED
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

const EMAIL_FROM = process.env.EMAIL_FROM || '"Bisma Fashion" <noreply@royaltailor.com>';
const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL || process.env.ADMIN_EMAIL || 'admin@royaltailor.com';
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export async function sendNewLeadNotification(lead) {
  if (!transporter) {
    console.log('[Email] SMTP not configured — skipping admin notification');
    return;
  }

  const customList = lead.customizations?.length
    ? lead.customizations.map((c) => `<li>${c}</li>`).join('')
    : '<li>Koi customization nahi</li>';

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: ADMIN_EMAIL,
    subject: `✂️ Naya Order: ${lead.name} — ${lead.garmentType || 'Garment'} (${lead.fabricQuality || ''})`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 24px; border-radius: 12px;">
        <div style="background: #064e3b; padding: 20px 24px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: #6ee7b7; margin: 0; font-size: 20px;">Naya Order — Bisma Fashion</h1>
          <p style="color: #a7f3d0; margin: 4px 0 0; font-size: 14px;">Customer ne inquiry submit ki hai</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
          <tr style="background: #f1f5f9;"><td style="padding: 10px 16px; font-weight: bold; color: #475569; font-size: 13px; width: 40%;">Naam</td><td style="padding: 10px 16px; color: #1e293b; font-size: 14px;">${lead.name}</td></tr>
          <tr><td style="padding: 10px 16px; font-weight: bold; color: #475569; font-size: 13px;">Email</td><td style="padding: 10px 16px;"><a href="mailto:${lead.email}" style="color: #059669;">${lead.email}</a></td></tr>
          <tr style="background: #f1f5f9;"><td style="padding: 10px 16px; font-weight: bold; color: #475569; font-size: 13px;">Phone</td><td style="padding: 10px 16px; color: #1e293b; font-size: 14px;">${lead.phone || '—'}</td></tr>
          <tr><td style="padding: 10px 16px; font-weight: bold; color: #475569; font-size: 13px;">WhatsApp</td><td style="padding: 10px 16px; color: #1e293b; font-size: 14px;">${lead.whatsapp || '—'}</td></tr>
          <tr style="background: #f1f5f9;"><td style="padding: 10px 16px; font-weight: bold; color: #475569; font-size: 13px;">Libas (Garment)</td><td style="padding: 10px 16px; color: #1e293b; font-size: 14px;">${lead.garmentType || '—'}</td></tr>
          <tr><td style="padding: 10px 16px; font-weight: bold; color: #475569; font-size: 13px;">Kapra Quality</td><td style="padding: 10px 16px; color: #1e293b; font-size: 14px;">${lead.fabricQuality || '—'}</td></tr>
          <tr style="background: #f1f5f9;"><td style="padding: 10px 16px; font-weight: bold; color: #475569; font-size: 13px;">Estimated Price</td><td style="padding: 10px 16px; color: #059669; font-weight: bold; font-size: 14px;">${lead.estimatedPrice || '—'}</td></tr>
          <tr><td style="padding: 10px 16px; font-weight: bold; color: #475569; font-size: 13px;">Delivery</td><td style="padding: 10px 16px; color: #1e293b; font-size: 14px;">${lead.deliveryPreference || 'Standard'}</td></tr>
          <tr style="background: #f1f5f9;"><td style="padding: 10px 16px; font-weight: bold; color: #475569; font-size: 13px;">Contact Preference</td><td style="padding: 10px 16px; color: #1e293b; font-size: 14px;">${lead.contactPreference || '—'}</td></tr>
          <tr><td style="padding: 10px 16px; font-weight: bold; color: #475569; font-size: 13px;">Customizations</td><td style="padding: 10px 16px; color: #1e293b; font-size: 14px;"><ul style="margin: 0; padding-left: 16px;">${customList}</ul></td></tr>
          ${lead.notes ? `<tr style="background: #f1f5f9;"><td style="padding: 10px 16px; font-weight: bold; color: #475569; font-size: 13px; vertical-align: top;">Notes</td><td style="padding: 10px 16px; color: #1e293b; font-size: 14px;">${lead.notes}</td></tr>` : ''}
          <tr><td style="padding: 10px 16px; font-weight: bold; color: #475569; font-size: 13px;">Source</td><td style="padding: 10px 16px; color: #1e293b; font-size: 14px;">${lead.source}</td></tr>
        </table>
        <div style="text-align: center; margin-top: 20px;">
          <a href="${APP_URL}/admin" style="background: #059669; color: white; font-weight: bold; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px;">Admin Dashboard Me Dekhein →</a>
        </div>
        <p style="color: #94a3b8; font-size: 11px; text-align: center; margin-top: 20px;">Lead ID: ${lead.id} • Submitted: ${new Date(lead.createdAt).toLocaleString('en-PK')}</p>
      </div>
    `,
  });
}

export async function sendLeadConfirmationEmail(lead) {
  if (!transporter) {
    console.log('[Email] SMTP not configured — skipping confirmation email');
    return;
  }

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: lead.email,
    subject: `Shukriya ${lead.name}! Aapki inquiry Bisma Fashion ko mil gayi`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 24px; border-radius: 12px;">
        <div style="background: #064e3b; padding: 24px; border-radius: 8px; margin-bottom: 24px; text-align: center;">
          <h1 style="color: #6ee7b7; margin: 0 0 8px; font-size: 24px;">Bisma Fashion</h1>
          <p style="color: #a7f3d0; margin: 0; font-size: 14px;">Perfect Fit, Every Time</p>
        </div>
        <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 16px;">
          <h2 style="color: #1e293b; margin: 0 0 12px; font-size: 18px;">Assalam o Alaikum ${lead.name}!</h2>
          <p style="color: #475569; line-height: 1.6; margin: 0 0 16px;">
            Aapki inquiry hamare paas aa gayi hai. Aap ne
            <strong>${lead.garmentType || 'libas'}</strong> ke liye
            ${lead.fabricQuality ? `<strong>${lead.fabricQuality}</strong> quality ke kapre ka` : ''}
            ${lead.estimatedPrice ? `estimated price <strong style="color: #059669;">${lead.estimatedPrice}</strong> hai.` : 'order diya hai.'}
          </p>
          <p style="color: #475569; line-height: 1.6; margin: 0 0 16px;">Humara team aapse <strong>1-2 working days</strong> mein raabta karega.</p>
          ${lead.deliveryPreference ? `<p style="color: #475569; line-height: 1.6; margin: 0;">Delivery preference: <strong>${lead.deliveryPreference}</strong></p>` : ''}
        </div>
        <div style="background: #ecfdf5; border: 1px solid #059669; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <p style="color: #065f46; margin: 0; font-size: 13px; font-weight: 600;">Aapka Reference Number</p>
          <p style="color: #064e3b; font-family: monospace; font-size: 15px; margin: 4px 0 0;">${lead.id}</p>
        </div>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${APP_URL}/calculator" style="background: #064e3b; color: white; font-weight: bold; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px;">Price Calculator →</a>
        </div>
        <p style="color: #94a3b8; font-size: 11px; text-align: center; margin-top: 16px;">
          Agar aap ne ye inquiry submit nahi ki, to is email ko ignore karein.<br>
          Bisma Fashion | <a href="${APP_URL}" style="color: #059669;">${APP_URL}</a>
        </p>
      </div>
    `,
  });
}
