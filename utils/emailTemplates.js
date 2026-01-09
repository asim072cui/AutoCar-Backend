// Email Templates for Auto Car Application

/**
 * Modern OTP Email Template with Enhanced Design
 * @param {string} otp - 6-digit OTP code
 * @param {string} userName - User's name (default: "User")
 * @returns {string} HTML email template
 */
export const createOtpEmailTemplate = (otp, userName = "User") => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <!--[if mso]>
        <style type="text/css">
            body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
        </style>
        <![endif]-->
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <!-- Main Container -->
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); overflow: hidden; max-width: 100%;">
                        
                        <!-- Header with Gradient -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td align="center">
                                            <div style="font-size: 48px; margin-bottom: 10px;">🔐</div>
                                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                                                Verification Code
                                            </h1>
                                            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                                                Auto Car Account Security
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Content Section -->
                        <tr>
                            <td style="padding: 50px 40px;">
                                <!-- Greeting -->
                                <h2 style="margin: 0 0 20px 0; color: #2d3748; font-size: 24px; font-weight: 600;">
                                    Hello ${userName}! 👋
                                </h2>
                                
                                <!-- Main Message -->
                                <p style="margin: 0 0 30px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                    We received a request to reset your password. To proceed with resetting your password, please use the verification code below:
                                </p>
                                
                                <!-- OTP Box with Enhanced Design -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                    <tr>
                                        <td align="center" style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); border-radius: 12px; padding: 30px; border: 2px dashed #667eea;">
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td align="center">
                                                        <div style="font-size: 42px; font-weight: bold; letter-spacing: 12px; color: #667eea; text-align: center; font-family: 'Courier New', monospace; padding: 10px;">
                                                            ${otp}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                
                                <!-- Expiration Notice -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                    <tr>
                                        <td style="background-color: #ebf8ff; border-left: 4px solid #3182ce; padding: 16px 20px; border-radius: 8px;">
                                            <p style="margin: 0; color: #2c5282; font-size: 15px; line-height: 1.6;">
                                                ⏱️ This code will <strong>expire in 10 minutes</strong> for security reasons. Please use it promptly.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                                
                                <!-- Security Warning -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                                    <tr>
                                        <td style="background-color: #fff5f5; border-left: 4px solid #fc8181; padding: 16px 20px; border-radius: 8px;">
                                            <p style="margin: 0; color: #742a2a; font-size: 14px; line-height: 1.6;">
                                                ⚠️ <strong>Security Notice:</strong> If you didn't request this code, please ignore this email and consider changing your password to keep your account secure.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                                
                                <!-- Tips Section -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; background-color: #f7fafc; border-radius: 8px; padding: 20px;">
                                    <tr>
                                        <td>
                                            <p style="margin: 0 0 10px 0; color: #2d3748; font-size: 15px; font-weight: 600;">
                                                💡 Security Tips:
                                            </p>
                                            <ul style="margin: 0; padding-left: 20px; color: #4a5568; font-size: 14px; line-height: 1.8;">
                                                <li>Never share your verification code with anyone</li>
                                                <li>Auto Car will never ask for your code via phone or email</li>
                                                <li>Use a strong, unique password for your account</li>
                                            </ul>
                                        </td>
                                    </tr>
                                </table>
                                
                                <!-- Closing -->
                                <p style="margin: 30px 0 0 0; color: #718096; font-size: 14px; line-height: 1.6;">
                                    Thank you for using our service!<br>
                                    <strong style="color: #2d3748;">The Auto Car Team</strong>
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f7fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td align="center">
                                            <p style="margin: 0 0 10px 0; color: #a0aec0; font-size: 12px; line-height: 1.6;">
                                                This is an automated message, please do not reply to this email.
                                            </p>
                                            <p style="margin: 0 0 15px 0; color: #a0aec0; font-size: 12px; line-height: 1.6;">
                                                © ${new Date().getFullYear()} Auto Car. All rights reserved.
                                            </p>
                                            <div style="margin-top: 15px;">
                                                <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Help Center</a>
                                                <span style="color: #cbd5e0;">|</span>
                                                <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Privacy Policy</a>
                                                <span style="color: #cbd5e0;">|</span>
                                                <a href="#" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Terms of Service</a>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    
                    <!-- Bottom Padding -->
                    <table width="600" cellpadding="0" cellspacing="0" style="max-width: 100%;">
                        <tr>
                            <td style="padding: 20px; text-align: center;">
                                <p style="margin: 0; color: #a0aec0; font-size: 11px;">
                                    You received this email because you requested a password reset for your Auto Car account.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;
};

/**
 * Welcome Email Template
 * @param {string} userName - User's name
 * @returns {string} HTML email template
 */
export const createWelcomeEmailTemplate = (userName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Auto Car</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); overflow: hidden; max-width: 100%;">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                                <div style="font-size: 48px; margin-bottom: 10px;">🚗</div>
                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                                    Welcome to Auto Car!
                                </h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 50px 40px;">
                                <h2 style="margin: 0 0 20px 0; color: #2d3748; font-size: 24px; font-weight: 600;">
                                    Hello ${userName}! 🎉
                                </h2>
                                <p style="margin: 0 0 20px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                    Thank you for joining Auto Car! We're excited to have you on board.
                                </p>
                                <p style="margin: 0 0 30px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                    Your account has been successfully created. You can now explore all the features we offer.
                                </p>
                                
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td align="center" style="padding: 20px 0;">
                                            <a href="#" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px;">
                                                Get Started
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f7fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
                                <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                                    © ${new Date().getFullYear()} Auto Car. All rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;
};

/**
 * Password Reset Success Email Template
 * @param {string} userName - User's name
 * @returns {string} HTML email template
 */
export const createPasswordResetSuccessTemplate = (userName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Successful</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); overflow: hidden; max-width: 100%;">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); padding: 40px 30px; text-align: center;">
                                <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                                    Password Reset Successful
                                </h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 50px 40px;">
                                <h2 style="margin: 0 0 20px 0; color: #2d3748; font-size: 24px; font-weight: 600;">
                                    Hello ${userName}!
                                </h2>
                                <p style="margin: 0 0 20px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                    Your password has been successfully reset. You can now log in with your new password.
                                </p>
                                <p style="margin: 0 0 30px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                    If you didn't make this change, please contact our support team immediately.
                                </p>
                                
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0; background-color: #f7fafc; border-radius: 8px; padding: 20px;">
                                    <tr>
                                        <td>
                                            <p style="margin: 0 0 10px 0; color: #2d3748; font-size: 14px;">
                                                <strong>Reset Time:</strong> ${new Date().toLocaleString()}
                                            </p>
                                            <p style="margin: 0; color: #2d3748; font-size: 14px;">
                                                <strong>IP Address:</strong> (Hidden for security)
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f7fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
                                <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                                    © ${new Date().getFullYear()} Auto Car. All rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;
};
