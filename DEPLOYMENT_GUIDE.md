# 🚀 PC Builder App - Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Backend (Django)
- [ ] Set up environment variables (copy `env.example` to `.env`)
- [ ] Generate a new secret key: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
- [ ] Set `DEBUG=False` for production
- [ ] Configure production database (MySQL/PostgreSQL)
- [ ] Set up static file serving
- [ ] Configure CORS for your frontend domain

### ✅ Frontend (React)
- [ ] Set `VITE_API_URL` to your backend URL
- [ ] Build the project: `npm run build`
- [ ] Deploy static files to a web server

## 🛠️ Quick Local Setup for Friends

### Option 1: Local Development (Easiest)
```bash
# Clone the repository
git clone <your-repo-url>
cd pc-builder

# Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend Setup (new terminal)
cd frontend
npm install
npm run dev
```

### Option 2: Docker (Recommended for sharing)
```bash
# Create docker-compose.yml
# Build and run containers
docker-compose up --build
```

## 🌐 Production Deployment Options

### 1. Heroku (Free tier available)
- Backend: Deploy Django app
- Frontend: Deploy React build to static hosting
- Database: Use Heroku Postgres

### 2. Railway/Render (Easy deployment)
- Automatic deployment from GitHub
- Free tier available
- Built-in database support

### 3. Vercel + Railway
- Frontend: Deploy to Vercel
- Backend: Deploy to Railway
- Database: Railway Postgres

## 🔧 Environment Variables

### Backend (.env)
```env
SECRET_KEY=your-generated-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
DATABASE_URL=your-database-url
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com
```

## 📱 Sharing with Friends

### For Non-Technical Friends:
1. Deploy to a free hosting service
2. Share the live URL
3. Create a simple user guide

### For Technical Friends:
1. Share the GitHub repository
2. Provide the deployment guide
3. Include the local setup instructions

## 🎯 Current App Status

✅ **Ready Features:**
- User authentication (login/register)
- Component browsing and selection
- PC build creation and management
- Compatibility checking
- Responsive UI with TailwindCSS
- RESTful API with documentation

⚠️ **Needs Before Sharing:**
- Production deployment
- Environment variable setup
- Database migration to production
- Error handling improvements
- User guide/documentation

## 🚨 Security Notes

- Never commit `.env` files to version control
- Use strong secret keys in production
- Enable HTTPS in production
- Regularly update dependencies
- Monitor for security vulnerabilities 