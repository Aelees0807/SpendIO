# Backend Deployment Guide

This guide covers deploying the SpendIO backend to various hosting platforms.

## Prerequisites

1. **MongoDB Cloud Database** - Set up MongoDB Atlas:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/database`)
   - Whitelist all IP addresses (0.0.0.0/0) for serverless deployments

2. **Environment Variables** - You'll need:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `PORT` - Port number (usually 5000 or auto-assigned)
   - `JWT_SECRET` - Secret key for JWT tokens
   - `NODE_ENV` - Set to `production`

---

## Option 1: Deploy to Render (Recommended)

[Render](https://render.com) offers free tier hosting for Node.js applications.

### Steps:

1. **Create a `render.yaml` file** (optional, for infrastructure as code)
2. **Push your code to GitHub** (if not already done)
3. **Sign up/Login to Render**: https://render.com
4. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `spendio-backend`
     - **Region**: Choose closest to your users
     - **Branch**: `main`
     - **Root Directory**: `backend`
     - **Build Command**: `npm install`
     - **Start Command**: `node server.js`
5. **Add Environment Variables**:
   - Go to "Environment" tab
   - Add each variable from Prerequisites
6. **Deploy**: Click "Create Web Service"
7. **Get your URL**: Copy the deployed URL (e.g., `https://spendio-backend.onrender.com`)

---

## Option 2: Deploy to Railway

[Railway](https://railway.app) provides easy deployment with auto-scaling.

### Steps:

1. **Sign up/Login to Railway**: https://railway.app
2. **Create New Project**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your SpendIO repository
3. **Configure Service**:
   - Root directory: `backend`
   - Start command: `node server.js`
4. **Add Environment Variables**:
   - Click on your service → "Variables" tab
   - Add all variables from Prerequisites
5. **Deploy**: Railway will auto-deploy
6. **Get your URL**: Go to "Settings" → "Generate Domain"

---

## Option 3: Deploy to Heroku

Note: Heroku no longer has a free tier, but offers affordable options.

### Steps:

1. **Install Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli
2. **Login**: `heroku login`
3. **Navigate to backend**: `cd backend`
4. **Create Heroku app**: `heroku create spendio-backend`
5. **Add start script** to `package.json`:
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```
6. **Set environment variables**:
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-uri"
   heroku config:set JWT_SECRET="your-secret"
   heroku config:set NODE_ENV=production
   ```
7. **Deploy**:
   ```bash
   git subtree push --prefix backend heroku main
   ```

---

## Post-Deployment

### Update Frontend

Once your backend is deployed, update your frontend environment variables:

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Update/Add `VITE_API_URL` with your backend URL (e.g., `https://spendio-backend.onrender.com/api`)
4. Redeploy frontend for changes to take effect

### Test Your API

Test your deployed backend:

```bash
# Health check (you may need to add this endpoint)
curl https://your-backend-url.com

# Test registration endpoint
curl -X POST https://your-backend-url.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

---

## Troubleshooting

### CORS Errors

Ensure your backend allows requests from your Vercel frontend URL. Update `server.js`:

```javascript
const cors = require("cors");
app.use(
  cors({
    origin: ["https://your-vercel-app.vercel.app", "http://localhost:5173"],
    credentials: true,
  }),
);
```

### Database Connection Issues

- Verify MongoDB Atlas connection string is correct
- Ensure IP whitelist includes 0.0.0.0/0 or your platform's IP range
- Check that database user credentials are correct

### Application Crashes

- Check logs on your hosting platform
- Verify all environment variables are set correctly
- Ensure `package.json` has correct start script
