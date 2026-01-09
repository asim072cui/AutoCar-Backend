import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createOtpEmailTemplate } from "./utils/emailTemplates.js";

dotenv.config();

// Test Email Configuration
const testEmailConfiguration = async () => {
  console.log("🧪 Testing Email Configuration...\n");
  
  console.log("📧 Email Settings:");
  console.log("Service:", process.env.NODE_MAILER_SERVICE);
  console.log("Host:", process.env.NODE_MAILER_HOST);
  console.log("Port:", process.env.NODE_MAILER_PORT);
  console.log("User:", process.env.NODE_MAILER_USER);
  console.log("Pass:", process.env.NODE_MAILER_PASS ? "***" + process.env.NODE_MAILER_PASS.slice(-4) : "Not set");
  console.log("\n");

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: process.env.NODE_MAILER_SERVICE,
      host: process.env.NODE_MAILER_HOST,
      port: process.env.NODE_MAILER_PORT,
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS
      }
    });

    // Verify connection
    console.log("🔌 Testing SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection successful!\n");

    // Send test email
    console.log("📨 Sending test OTP email...");
    const testOtp = "123456";
    const testUserName = "Test User";
    const htmlTemplate = createOtpEmailTemplate(testOtp, testUserName);

    const info = await transporter.sendMail({
      from: `"Auto Car Test" <${process.env.NODE_MAILER_USER}>`,
      to: process.env.NODE_MAILER_USER, // Send to yourself for testing
      subject: "🔐 Test OTP Email - Auto Car",
      text: `Your test OTP is ${testOtp}`,
      html: htmlTemplate
    });

    console.log("✅ Test email sent successfully!");
    console.log("📬 Message ID:", info.messageId);
    console.log("📧 Email sent to:", process.env.NODE_MAILER_USER);
    console.log("\n🎉 All tests passed! Your email configuration is working correctly.");
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.log("\n💡 Troubleshooting tips:");
    console.log("1. Check your email credentials in .env file");
    console.log("2. For Gmail, enable 'App Passwords' in Google Account settings");
    console.log("3. Ensure SMTP port (587) is not blocked by firewall");
    console.log("4. Verify email service is correctly configured");
  }
};

// Run the test
testEmailConfiguration();
