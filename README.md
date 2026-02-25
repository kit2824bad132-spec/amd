# AgroIntel AI

An AI-powered precision agriculture platform that detects crop diseases from uploaded leaf images and provides treatment recommendations.

## Tech Stack
* Frontend: React (Vite) + Tailwind CSS
* Backend: Node.js + Express
* Database: MongoDB
* AI Microservice: Python FastAPI + PyTorch CNN

## AMD GPU Compatibility
The AI microservice logic includes `torch.device("cuda" if torch.cuda.is_available() else "cpu")`. For ROCm compatibility, ensure PyTorch is installed with the ROCm build as per the instructions below.

## Setup Steps

### 1. Database
Create a free tier MongoDB Atlas cluster and get the connection URI. Create a `.env` in the `server` folder with:
```
PORT=5000
MONGODB_URI=your_uri_here
JWT_SECRET=your_secret
```

### 2. Backend (Node + Express)
```bash
cd server
npm install
npm run dev
```

### 3. Frontend (React + Tailwind)
```bash
cd client
npm install
npm run dev
```

### 4. AI Service (Python FastAPI)
```bash
cd ai-service
python -m venv venv
source venv/Scripts/activate # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```
