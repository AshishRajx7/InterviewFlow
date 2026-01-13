# 🚀 InterviewFlow

**InterviewFlow** is a modern, real-time coding interview platform built for developers to practice, collaborate, and conduct mock technical interviews with ease.

It combines **live coding sessions**, **secure authentication**, and a **clean SaaS-style UI** to simulate real interview environments.

---

## ✨ Features

- 🔐 **Authentication & Authorization**
  - Secure sign-in and sign-up using Clerk
  - Protected routes for dashboard, sessions, and problems

- 💻 **Live Coding Sessions**
  - Create and join 1-on-1 coding sessions
  - Real-time collaboration for interview practice

- 📊 **Dashboard**
  - View active sessions
  - Track recent interview sessions
  - Session statistics and quick actions

- 🧠 **Problem Management**
  - Predefined coding problems with difficulty levels
  - Problem-based session creation

- ⚡ **Background Jobs**
  - Integrated with Inngest for async workflows and event handling

- 🎨 **Modern UI**
  - Glassmorphism design
  - Gradient-based theme (purple → cyan)
  - Responsive and production-ready layout

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Tailwind CSS
- Lucide Icons
- Clerk Authentication

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Clerk (Auth Middleware)
- Inngest (Background jobs)
- CORS-secured REST APIs

### Deployment
- Frontend: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

## 📁 Project Structure
```
InterviewFlow/
├── frontend/ # React frontend (Vite)
│ ├── src/
│ └── vercel.json
│
├── backend/ # Node.js + Express backend
│ ├── src/
│ │ ├── routes/
│ │ ├── lib/
│ │ └── server.js
│
└── package.json # Root scripts

```

---

## ⚙️ Environment Variables

### Frontend (`.env`)
VITE_API_URL=your_backend_url
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

shell
Copy code

### Backend (`.env`)
PORT=3000
MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret
CLIENT_URL=your_vercel_frontend_url
INNGEST_SIGNING_KEY=your_inngest_key


---

## 🚀 Running Locally

### 1️⃣ Clone the repo
```bash
git clone https://github.com/yourusername/InterviewFlow.git
cd InterviewFlow
2️⃣ Install dependencies
bash
Copy code
npm install --prefix backend
npm install --prefix frontend
3️⃣ Run backend
bash
Copy code
cd backend
npm run dev
4️⃣ Run frontend
bash
Copy code
cd frontend
npm run dev
🌍 Live Deployment
Frontend: https://interview-flow-seven.vercel.app

Backend: Hosted on Render

🎯 Future Enhancements
Live video calling

Real-time code editor sync

Interview recordings

Peer matching system

Admin problem management

🤝 Contributing
Contributions are welcome.
Feel free to fork the repository and submit a pull request.

📄 License
This project is licensed under the MIT License.

👨‍💻 Author
Ashish Raj
Built with passion for developers preparing for interviews.

