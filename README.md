### **AI-Powered Medical Assistant with User-Specific Persistent Conversations**

<p align="center">
  <img src="https://img.shields.io/badge/FastAPI-Backend-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Supabase-Authentication-3ECF8E?style=for-the-badge">
  <img src="https://img.shields.io/badge/LangChain-Orchestration-purple?style=for-the-badge">
  <img src="https://img.shields.io/badge/LangGraph-Persistent%20Memory-orange?style=for-the-badge">
  <img src="https://img.shields.io/badge/Docker-Deployment-cyan?style=for-the-badge">
</p>

---

## 🚀 Live Applications

### 🌐 Frontend (React)

👉 [https://fullstack-medical-application-1.onrender.com/]

### ⚙️ Backend (FastAPI APIs)

👉 [https://fullstack-medical-application-apis.onrender.com/]

### 📦 GitHub Repository

👉 [https://github.com/Warishayat/Fullstack-Medical-Application]

---

## 📌 Project Overview

**Fullstack Medical AI Application** is a **production-grade SaaS AI medical assistant** that enables secure authentication, intelligent medical conversations, and **user-specific persistent chat memory**.

The system uses:

* **Supabase** for authentication & user management
* **LangChain** for LLM workflow orchestration
* **LangGraph** for stateful, persistent, per-user conversations

Each user continues their **own chat history** across sessions, securely isolated using their **Supabase user ID**.

---

## ✨ Key Features

### 🔐 Supabase Authentication

* Secure signup & login
* JWT-based user sessions
* Supabase User ID used across backend
* Backend validates authenticated users only

---

### 🧠 AI Medical Assistant

* Symptom-based medical conversations
* Context-aware reasoning
* LLM-powered responses using Groq

---

### 🔄 LangChain + LangGraph Orchestration (Core Feature)

#### 🧩 LangChain

* Prompt templates
* Tool chaining
* LLM integration
* Vector search via Pinecone

#### 🕸 LangGraph (Persistence Layer)

* **User-specific conversation graphs**
* Chat state bound to **Supabase user ID**
* Persistent memory across requests
* No conversation leakage between users

✅ Each user has an **independent conversation graph**
✅ Users resume chats after logout/login
✅ Scalable orchestration architecture

---

## 🧠 How User-Specific Persistence Works

```text
User logs in (Supabase)
        ↓
Supabase returns authenticated user ID
        ↓
Backend extracts user ID from token
        ↓
LangGraph initialized with user-specific config
        ↓
Conversation state stored & retrieved per user
```

✔ Fully isolated user sessions
✔ Persistent AI memory
✔ Production-ready design

---

## 🗂 Vector Memory (Pinecone)

* Medical conversation embeddings
* Semantic retrieval
* Long-term contextual memory
* Optimized for fast search

---

## 🏗️ Tech Stack

### 🔹 Frontend

* React.js
* Axios
* Supabase Client SDK
* Hosted on Render

### 🔹 Backend

* FastAPI
* Supabase Auth (JWT verification)
* LangChain
* **LangGraph (Stateful Orchestration)**
* Pinecone Vector DB
* Groq LLM
* Docker

---

## 📂 Project Structure

```
Fullstack-Medical-Application/
│
├── backend/
│   ├── main.py
│   ├── Router/
│   │   ├── auth.py        # Supabase auth handling
│   │   ├── chat.py        # LangGraph orchestration
│   │   └── message.py
│   ├── Helper/
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── supabaseClient.js
│
└── README.md
```

---

## ⚙️ Backend Setup (Local)

```bash
git clone https://github.com/Warishayat/Fullstack-Medical-Application
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 🐳 Backend Docker Setup

```bash
docker build -t medical-ai-backend .
docker run -p 8000:8000 -e PORT=8000 medical-ai-backend
```

---

## 🔑 Environment Variables

```env
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
GROQ_API_KEY=your_key
GOOGLE_API_KEY=your_key
HUGGINGFACEHUB_ACCESS_TOKEN=your_key
PINECONE_API_KEY=your_key
```

(Set in **Render → Environment Variables**)

---

## 🔗 API Health Check

```http
GET /
```

```json
{
  "status": 200,
  "message": "All routes are working fine"
}
```

---

## 🌍 Deployment Architecture

* Frontend → Render (Static Web App)
* Backend → Render (Docker Web Service)
* Authentication → Supabase
* Vector DB → Pinecone
* Orchestration → LangChain + LangGraph
* LLM → Groq

---

## 📈 Future Enhancements

* 🧾 Medical document upload & analysis
* 🗣 Voice-based medical assistant
* 📊 User medical history dashboard
* 🏥 Doctor recommendation system
* 🧠 Multi-agent LangGraph workflows

---

## 👨‍💻 Author

**Waris Hayat**
AI / ML Engineer

🔗 GitHub: [https://github.com/Warishayat]

---

## ⭐ Support

If you like this project:

⭐ Star the repo
🍴 Fork it
🐛 Open issues
💡 Suggest features

---

add kar sakta hoon — just bolo 👍
