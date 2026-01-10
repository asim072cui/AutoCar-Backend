# Vercel Deployment Guide for Backend

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- Vercel CLI installed: `npm i -g vercel`
- MongoDB database (MongoDB Atlas recommended)

## Files Created for Vercel Deployment

1. **vercel.json** - Vercel configuration file
2. **.vercelignore** - Files to ignore during deployment
3. **Updated server.js** - Made compatible with Vercel serverless

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - Select your project settings
   - Choose production deployment

4. **Set Environment Variables**:
   ```bash
   vercel env add MONGODB_URI
   vercel env add JWT_SECRET
   vercel env add CLOUDINARY_CLOUD_NAME
   vercel env add CLOUDINARY_API_KEY
   vercel env add CLOUDINARY_API_SECRET
   vercel env add EMAIL_USER
   vercel env add EMAIL_PASS
   vercel env add FRONTEND_URL
   vercel env add GOOGLE_CLIENT_ID
   vercel env add GOOGLE_CLIENT_SECRET
   ```

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Push code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Import on Vercel**:
   - Go to https://vercel.com/dashboard
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the backend folder as root directory

3. **Configure Project**:
   - Framework Preset: Other
   - Root Directory: `./` (or `backend` if in monorepo)
   - Build Command: Leave empty
   - Output Directory: Leave empty

4. **Add Environment Variables** in Vercel Dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
   - `EMAIL_USER`: Your email for nodemailer
   - `EMAIL_PASS`: Your email password/app password
   - `FRONTEND_URL`: Your frontend URL (e.g., https://yourapp.vercel.app)
   - `GOOGLE_CLIENT_ID`: Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
   - `PORT`: 5000

5. **Deploy**: Click "Deploy"

## Important Notes

### 1. Update Frontend URL
After deployment, update the CORS origin in your frontend app to use the Vercel backend URL:
- Your backend will be: `https://your-project-name.vercel.app`
- Update FRONTEND_URL in environment variables

### 2. MongoDB Atlas Setup
If you haven't already, set up MongoDB Atlas:
- Go to https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Add your Vercel IP ranges to whitelist (or use 0.0.0.0/0 for all IPs)
- Get your connection string

### 3. Socket.IO Limitations
⚠️ **Important**: Vercel's serverless functions have limitations with WebSocket/Socket.IO:
- Socket.IO may not work on Vercel due to serverless nature
- Consider using:
  - Pusher (https://pusher.com)
  - Ably (https://ably.com)
  - Railway (https://railway.app) for full server deployment
  - Render (https://render.com) for full server deployment

### 4. Cloudinary Configuration
Ensure your Cloudinary settings are properly configured in environment variables.

### 5. Email Configuration
For Nodemailer:
- Use Gmail App Password (not regular password)
- Enable "Less secure app access" or use App Passwords
- Consider using SendGrid or similar service for production

## Testing Your Deployment

1. **Check deployment status**:
   ```bash
   vercel ls
   ```

2. **View logs**:
   ```bash
   vercel logs
   ```

3. **Test API endpoints**:
   ```bash
   curl https://your-project-name.vercel.app/api/auth/test
   ```

## Troubleshooting

### Issue: Module not found
- Check all imports use `.js` extensions
- Verify `"type": "module"` in package.json

### Issue: Database connection fails
- Verify MONGODB_URI is set correctly
- Check MongoDB Atlas IP whitelist
- Ensure connection string includes database name

### Issue: CORS errors
- Update allowedOrigins in server.js
- Add your frontend URL to FRONTEND_URL environment variable

### Issue: 404 on routes
- Check vercel.json routes configuration
- Ensure all API routes start with `/api/`

## Alternative Deployment Platforms

If Vercel doesn't meet your needs (especially for Socket.IO):

1. **Railway** (Recommended for Socket.IO):
   - https://railway.app
   - Full server support
   - Easy GitHub integration

2. **Render**:
   - https://render.com
   - Free tier available
   - Full server support

3. **Heroku**:
   - https://heroku.com
   - Well-established platform

## Post-Deployment Checklist

- [ ] All environment variables are set
- [ ] MongoDB connection is working
- [ ] API endpoints are responding
- [ ] CORS is properly configured
- [ ] Frontend is updated with backend URL
- [ ] Email functionality is tested
- [ ] File uploads are working
- [ ] Authentication is working
- [ ] Socket.IO is working (or replaced with alternative)

## Support

For issues with:
- Vercel: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Socket.IO on serverless: Consider switching platforms

---
**Your backend is now ready for Vercel deployment! 🚀**
