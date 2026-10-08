import env from "../config/env.js";
import transporter from "../config/mailer.js";

const passwordResetTemplate = (otp: string) => {
  return /* html */ `
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); font-family: Arial, sans-serif;">
        <!-- Header with Yellow Tone -->
        <div style="background-color: #f4b41a; padding: 50px 20px; text-align: center;">
            <div style="margin: 0 auto; width: 80px; height: 80px;">
                <svg fill="#000000" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="7.68" width="80" height="80"><g><g id="Change_password"><path d="M464.4326,147.54a9.8985,9.8985,0,0,0-17.56,9.1406,214.2638,214.2638,0,0,1-38.7686,251.42c-83.8564,83.8476-220.3154,83.874-304.207-.0088a9.8957,9.8957,0,0,0-16.8926,7.0049v56.9a9.8965,9.8965,0,0,0,19.793,0v-34.55A234.9509,234.9509,0,0,0,464.4326,147.54Z"></path><path d="M103.8965,103.9022c83.8828-83.874,220.3418-83.8652,304.207-.0088a9.8906,9.8906,0,0,0,16.8926-6.9961v-56.9a9.8965,9.8965,0,0,0-19.793,0v34.55C313.0234-1.3556,176.0547,3.7509,89.9043,89.9012A233.9561,233.9561,0,0,0,47.5674,364.454a9.8985,9.8985,0,0,0,17.56-9.1406A214.2485,214.2485,0,0,1,103.8965,103.9022Z"></path><path d="M126.4009,254.5555v109.44a27.08,27.08,0,0,0,27,27H358.5991a27.077,27.077,0,0,0,27-27v-109.44a27.0777,27.0777,0,0,0-27-27H153.4009A27.0805,27.0805,0,0,0,126.4009,254.5555ZM328,288.13a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,328,288.13Zm-72,0a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,256,288.13Zm-72,0a21.1465,21.1465,0,1,1-21.1465,21.1464A21.1667,21.1667,0,0,1,184,288.13Z"></path><path d="M343.6533,207.756V171.7538a87.6533,87.6533,0,0,0-175.3066,0V207.756H188.14V171.7538a67.86,67.86,0,0,1,135.7208,0V207.756Z"></path></g></g></svg>
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

export const sendPasswordResetOtp = async (to: string, otp: string) => {
  await transporter.sendMail({
    from: `Stateful Authentication System <${env.SMTP_USER}>`,
    to: to,
    subject: 'Reset Your Password',
    html: passwordResetTemplate(otp)
  })
}

