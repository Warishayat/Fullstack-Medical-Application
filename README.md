**AI-Powered Medical Assistant with User-Specific Persistent Conversations**

<p align="center">
  <img src="https://img.shields.io/badge/FastAPI-Backend-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/LangGraph-Orchestration-purple?style=for-the-badge">
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

**Fullstack Medical AI Application** is an end-to-end **SaaS-style AI medical assistant** that enables:

* 🔐 Secure user authentication
* 🧠 AI-powered medical chat
* 🔄 **User-specific persistent conversations using LangGraph**
* 🧾 Vector-based memory with Pinecone
* 🌐 Separate scalable frontend & backend deployments

Each user continues their **own chat history**, even after logout, powered by **LangGraph state persistence configured with user ID**.

---

## ✨ Key Features

### 🧑‍⚕️ AI Medical Assistant

* Symptom-based medical conversations
* Context-aware responses
* LLM-powered reasoning

### 🔐 Authentication System

* User signup & login
* Token-based secure access
* User-specific chat isolation

### 🧠 LangGraph-Based Persistence (NEW ✨)

* Each user has a **separate conversation graph**
* Chat state maintained using **user ID**
* No conversation mixing between users
* Scalable orchestration layer

### 🗂 Vector Store (Pinecone)

* Medical conversation embeddings
* Fast semantic search
* Long-term memory support

### ⚙️ Scalable Architecture

* Frontend & backend deployed independently
* Dockerized backend
* Cloud-ready architecture

---

## 🏗️ Tech Stack

### 🔹 Frontend

* React.js
* Axios
* Tailwind / CSS
* Hosted on Render

### 🔹 Backend

* FastAPI
* LangChain
* **LangGraph (User-based persistence)**
* Pinecone Vector Database
* Groq LLM
* JWT Authentication
* Docker

---

## 🧠 LangGraph User Persistence (How it Works)

```text
User Login
   ↓
User ID extracted from token
   ↓
LangGraph initialized with user-specific config
   ↓
Conversation state stored & retrieved per user
   ↓
User continues previous chat seamlessly
```

✔ Each user has **isolated graph state**
✔ Chat resumes even after refresh or re-login
✔ Production-ready orchestration

---

## 📂 Project Structure

```
Fullstack-Medical-Application/
│
├── backend/
│   ├── main.py
│   ├── Router/
│   │   ├── auth.py
│   │   ├── chat.py
│   │   └── message.py
│   ├── Helper/
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── pages/
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

Backend requires the following:

```env
GROQ_API_KEY=your_key
GOOGLE_API_KEY=your_key
HUGGINGFACEHUB_ACCESS_TOKEN=your_key
PINECONE_API_KEY=your_key
```

(Set these in **Render Environment Variables**)

---

## 🔗 API Health Check

```http
GET /
```

**Response**

```json
{
  "status": 200,
  "message": "All routes are working fine"
}
```

---

## 🌍 Deployment

* Frontend → Render (Static Web Service)
* Backend → Render (Docker Web Service)
* Database → Pinecone
* LLM → Groq

---

## 📈 Future Enhancements

* 🧾 Medical report uploads
* 🗣 Voice-based interaction
* 📊 User medical history dashboard
* 🏥 Doctor recommendation system

---

## 👨‍💻 Author

**Waris Hayat**
AI / ML Engineer
🔗 GitHub: (https://github.com/Warishayat)

---

## ⭐ Support

If you like this project:

⭐ Star the repo
🍴 Fork it
🐛 Open issues
💡 Suggest improvements

---

Bas batao 👍
