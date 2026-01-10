# Quick Deployment Commands

## Deploy to Vercel (First Time)
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add FRONTEND_URL
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
vercel env add EMAIL_USER
vercel env add EMAIL_PASS
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET

# Deploy to production
vercel --prod
```

## Quick Deploy (After Initial Setup)
```bash
vercel --prod
```

## Your Backend URL
After deployment, your backend will be available at:
```
https://your-project-name.vercel.app
```

## Update Frontend
Update your frontend to use the new backend URL:
```javascript
const API_URL = "https://your-project-name.vercel.app/api";
```

## Next Steps
1. Run: `vercel` to deploy
2. Add all environment variables
3. Update frontend with new backend URL
4. Test all API endpoints

**Note**: Consider Railway or Render for Socket.IO support!
