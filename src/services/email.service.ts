import env from "../config/env.js";
import transporter from "../config/mailer.js";

const passwordResetTemplate = (otp: string) => {
  return /* html */ `
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); font-family: Arial, sans-serif;">
      <!-- Header with Yellow Tone -->
      <div style="background-color: #f4b41a; padding: 50px 20px; text-align: center;">
          <div style="margin: 0 auto; width: 80px; height: 65px;">
              <img width="65" height="65" src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/96/external-renew-of-insurance-policy-isolated-on-white-background-protection-regular-tal-revivo.png" alt="external-renew-of-insurance-policy-isolated-on-white-background-protection-regular-tal-revivo" />
          </div>
          <h2 style="color: #000000; font-size: 24px; font-weight: bold; margin-top: 20px; margin-bottom: 0;">Reset your password</h2>
      </div>
  
      <!-- Body Content -->
      <div style="padding: 40px 40px 30px 40px;">
          <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-top: 0; margin-bottom: 20px;">Hi,</p>
          <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-top: 0; margin-bottom: 20px;">We received a request to reset your password for your Stateful Authentication System account.</p>
          <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-top: 0; margin-bottom: 25px;">Use the One-Time Password (OTP) below to proceed. This code is valid for <strong>5 minutes</strong>.</p>
  
          <!-- OTP Display -->
          <div style="text-align: center; margin: 30px 0;">
              <div style="display: inline-block; background-color: #fcfcfc; border: 1px solid #e1e1e1; border-radius: 6px; padding: 14px 28px;">
                  <span style="font-size: 28px; font-weight: 600; letter-spacing: 5px; color: #111111;">${otp}</span>
              </div>
          </div>
  
          <p style="color: #555555; font-size: 14px; line-height: 1.5; margin-top: 30px; margin-bottom: 20px;">If you didn't request a password reset, please ignore this email.</p>
          <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-top: 30px; margin-bottom: 5px;">Best Regards,</p>
          <p style="color: #333333; font-size: 16px; font-weight: bold; line-height: 1.5; margin-top: 0; margin-bottom: 0;">Shah Faisal</p>
          <p style="color: #777777; font-size: 14px; line-height: 1.5; margin-top: 2px; margin-bottom: 0;">Stateful Authentication System</p>
      </div>
  
      <!-- Footer Divider -->
      <div style="padding: 0 40px;">
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 0;">
      </div>
  
      <!-- Footer Note -->
      <div style="padding: 20px 40px 40px 40px; text-align: center;">
          <p style="color: #999999; font-size: 12px; margin: 0;">This is an automated message from Stateful Authentication System. Please do not reply.</p>
      </div>
  </div>
  `;
};

const emailVerificationTemplate = (otp: string, recepientName: string = "Valued User") => {
  return /* html */ `
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); font-family: Arial, sans-serif;">
          <!-- Header with Yellow Tone -->
          <div style="background-color: #f4b41a; padding: 50px 20px; text-align: center;">
              <div style="margin: 0 auto; width: 80px; height: 65px;">
                  <img width="70" height="70" src="https://img.icons8.com/pulsar-line/48/verified-badge.png" alt="verified-badge"/>
              </div>
              <h2 style="color: #000000; font-size: 24px; font-weight: bold; margin-top: 20px; margin-bottom: 0;">Verify your email</h2>
          </div>
  
          <!-- Body Content -->
          <div style="padding: 40px 40px 30px 40px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-top: 0; margin-bottom: 20px;">Hi ${recepientName},</p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-top: 0; margin-bottom: 20px;">You're verifying the email address associated with your Stateful Authentication System account.</p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-top: 0; margin-bottom: 25px;">To verify your email address, please use the code below.. This code is valid for <strong>5 minutes</strong>.</p>
              
              <!-- OTP Display Box -->
              <div style="text-align: center; margin: 30px 0;">
                  <div style="display: inline-block; background-color: #fcfcfc; border: 1px solid #e1e1e1; border-radius: 6px; padding: 14px 28px;">
                      <span style="font-size: 28px; font-weight: 600; letter-spacing: 5px; color: #111111;">${otp}</span>
                  </div>
              </div>
  
              <p style="color: #555555; font-size: 14px; line-height: 1.5; margin-top: 30px; margin-bottom: 20px;">Don't share this code with anyone. If you didn't request this, you can safely ignore this email.</p>
              <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-top: 30px; margin-bottom: 5px;">Best Regards,</p>
              <p style="color: #333333; font-size: 16px; font-weight: bold; line-height: 1.5; margin-top: 0; margin-bottom: 0;">Shah Faisal</p>
              <p style="color: #777777; font-size: 14px; line-height: 1.5; margin-top: 2px; margin-bottom: 0;">Stateful Authentication System</p>
          </div>
  
          <!-- Footer Divider -->
          <div style="padding: 0 40px;">
              <hr style="border: none; border-top: 1px solid #eaeaea; margin: 0;">
          </div>
  
          <!-- Footer Note -->
          <div style="padding: 20px 40px 40px 40px; text-align: center;">
              <p style="color: #999999; font-size: 12px; margin: 0;">This is an automated message from Stateful Authentication System. Please do not reply.</p>
          </div>
      </div>
  `;
}; 

export const sendPasswordResetOtpEmail = async (to: string, otp: string) => {
  await transporter.sendMail({
    from: `Stateful Authentication System <${env.SMTP_USER}>`,
    to: to,
    subject: 'Reset Your Password',
    html: passwordResetTemplate(otp)
  })
}

export const sendVerificationOtpEmail = async (to: string, recepientName: string, otp: string) => {
  await transporter.sendMail({
    from: `Stateful Authentication System <${env.SMTP_USER}>`,
    to: to,
    subject: 'Verify Your Email',
    html: emailVerificationTemplate(otp, recepientName)
  })
}
 