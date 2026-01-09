# 🚗 Auto Car - OTP Email System

> Modern, secure OTP-based password reset system with beautiful email templates

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🔐 **Secure OTP System** - 6-digit codes with 10-minute expiration
- 📧 **Beautiful Email Templates** - Modern, responsive HTML emails
- 📱 **Mobile-Friendly Form** - Complete password reset interface
- 🎨 **Email Preview System** - Test templates before deployment
- ⚡ **Fast & Reliable** - Built with Node.js and Express
- 🔒 **Security First** - bcrypt hashing, JWT tokens, input validation

## 🎯 Demo

### OTP Form
![OTP Form](https://via.placeholder.com/800x500/667eea/ffffff?text=Modern+OTP+Form)

### Email Template
![Email Template](https://via.placeholder.com/800x500/764ba2/ffffff?text=Beautiful+Email+Template)

## 🚀 Quick Start

### Prerequisites

- Node.js >= 14.0.0
- MongoDB
- SMTP Email Account (Gmail recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/auto-car.git
   cd auto-car/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   
   NODE_MAILER_USER=your_email@gmail.com
   NODE_MAILER_PASS=your_app_password
   NODE_MAILER_SERVICE=gmail
   NODE_MAILER_HOST=smtp.gmail.com
   NODE_MAILER_PORT=587
   ```

4. **Test email configuration**
   ```bash
   npm run test-email
   ```

5. **Start the server**
   ```bash
   npm start
   ```

6. **Access the application**
   - Quick Start Guide: http://localhost:5000
   - OTP Form: http://localhost:5000/otp-form.html
   - Email Previews: http://localhost:5000/api/auth/preview-otp-email

## 📮 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Password Reset

#### Request OTP
```http
POST /api/auth/request-password-reset
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "message": "OTP sent to your email"
}
```

#### Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "newPassword123"
}
```

**Response:**
```json
{
  "message": "Password reset successful"
}
```

### Email Previews

- **OTP Email**: `GET /api/auth/preview-otp-email`
- **Welcome Email**: `GET /api/auth/preview-welcome-email`
- **Success Email**: `GET /api/auth/preview-success-email`

## 📁 Project Structure

```
backend/
├── controllers/
│   └── authControlle.js          # Authentication & OTP logic
├── utils/
│   └── emailTemplates.js         # Modern email templates
├── routes/
│   └── authRoutes.js             # API routes
├── models/
│   └── userModel.js              # User schema with OTP fields
├── middleware/
│   └── authMiddleware.js         # JWT authentication
├── public/
│   ├── index.html                # Quick start guide
│   └── otp-form.html             # Password reset form
├── config/
│   └── db.js                     # MongoDB configuration
├── test-email.js                 # Email testing utility
├── server.js                     # Main server file
└── .env                          # Environment variables
```

## 🎨 Email Templates

### OTP Verification Email
- Modern gradient design (purple theme)
- Large, easy-to-read OTP code
- Security warnings and tips
- Mobile-responsive layout
- 10-minute expiration notice

### Welcome Email
- Branded welcome message
- Call-to-action button
- Professional design

### Password Reset Success Email
- Confirmation message
- Reset timestamp
- Security notice

## 🧪 Testing

### Using the Web Form

1. Open http://localhost:5000/otp-form.html
2. Enter your email address
3. Check your email for the OTP code
4. Enter the OTP and new password
5. Done! Login with your new password

### Using Postman/Thunder Client

Import the collection:
```bash
Auto-Car-OTP-API.postman_collection.json
```

Or test manually:

```bash
# 1. Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# 2. Request OTP
curl -X POST http://localhost:5000/api/auth/request-password-reset \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# 3. Check email for OTP

# 4. Reset password
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","otp":"123456","newPassword":"newpass123"}'
```

## 🔧 Configuration

### Gmail Setup (Recommended)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Go to App Passwords
4. Create password for "Mail"
5. Use this password in `NODE_MAILER_PASS`

⚠️ **Important**: Regular Gmail password won't work!

### Other Email Providers

Update `.env` with your provider's settings:

**Outlook:**
```env
NODE_MAILER_HOST=smtp-mail.outlook.com
NODE_MAILER_PORT=587
NODE_MAILER_SERVICE=outlook
```

**Yahoo:**
```env
NODE_MAILER_HOST=smtp.mail.yahoo.com
NODE_MAILER_PORT=587
NODE_MAILER_SERVICE=yahoo
```

## 🎨 Customization

### Change Email Colors

Edit `utils/emailTemplates.js`:

```javascript
// Current: Purple gradient
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)

// Blue gradient
background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%)

// Green gradient
background: linear-gradient(135deg, #48bb78 0%, #38a169 100%)
```

### Change Form Colors

Edit `public/otp-form.html`:

```css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Add Your Logo

In email templates:

```html
<img src="https://your-domain.com/logo.png" alt="Logo" 
     style="max-width: 150px; margin-bottom: 20px;">
```

## 🔒 Security Features

- ✅ OTP expires after 10 minutes
- ✅ OTP is deleted after use
- ✅ Passwords hashed with bcrypt
- ✅ JWT token authentication
- ✅ Email format validation
- ✅ Protected routes with middleware
- ✅ CORS configuration
- ✅ Environment variable protection

## 🐛 Troubleshooting

### Email Not Sending

**Problem**: Emails not being delivered

**Solutions**:
- Check `.env` file has correct credentials
- For Gmail, use App Password (not regular password)
- Verify port 587 is not blocked by firewall
- Run `npm run test-email` to diagnose
- Check SMTP service is enabled

### OTP Not Working

**Problem**: OTP verification fails

**Solutions**:
- Ensure user exists in database
- Check OTP hasn't expired (10 minutes)
- Verify MongoDB connection is active
- Look at server logs for errors
- Try requesting a new OTP

### Form Not Loading

**Problem**: OTP form doesn't appear

**Solutions**:
- Ensure server is running on port 5000
- Check browser console for errors
- Verify `public` folder is being served
- Update API_BASE_URL if port changed

## 📚 Documentation

- **Full Documentation**: [`OTP_DOCUMENTATION.md`](./OTP_DOCUMENTATION.md)
- **Implementation Summary**: [`IMPLEMENTATION_SUMMARY.md`](./IMPLEMENTATION_SUMMARY.md)
- **API Collection**: [`Auto-Car-OTP-API.postman_collection.json`](./Auto-Car-OTP-API.postman_collection.json)

## 🛠️ Built With

- [Node.js](https://nodejs.org/) - Runtime environment
- [Express](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - ODM
- [Nodemailer](https://nodemailer.com/) - Email sending
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Password hashing
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JWT tokens
- [dotenv](https://github.com/motdotla/dotenv) - Environment variables

## 📝 Scripts

```bash
npm start          # Start the server
npm run test-email # Test email configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Email templates inspired by modern design trends
- Built with best practices in security and UX
- Tested across major email clients and browsers

## 📞 Support

If you have any questions or need help:

1. Check the [documentation](./OTP_DOCUMENTATION.md)
2. Run `npm run test-email` for diagnostics
3. Open an [issue](https://github.com/yourusername/auto-car/issues)
4. Contact support

---

⭐ **Star this repo if you find it helpful!**

Made with ❤️ by Auto Car Team
