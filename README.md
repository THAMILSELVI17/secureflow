# 🔐 SecureFlow — Role-Based User Access & Management Platform

<p align="center">
  <strong>A secure full-stack web application for authentication, role-based access control, user management, and access-controlled records.</strong>
</p>

<p align="center">
  <a href="https://secureflow-iota.vercel.app">
    🌐 Live Demo
  </a>
  &nbsp; • &nbsp;
  <a href="https://github.com/THAMILSELVI17/secureflow">
    💻 GitHub Repository
  </a>
</p>

---

## 🚀 Live Application

### 🌐 Frontend
**Live Demo:**  
https://secureflow-iota.vercel.app

### ⚙️ Backend API
**API:**  
https://secureflow-api-1lhe.onrender.com

### 💻 Source Code
**GitHub:**  
https://github.com/THAMILSELVI17/secureflow

---

## 📌 Overview

**SecureFlow** is a full-stack role-based user access and management platform developed using **Angular, TypeScript, Node.js, Express.js, and MongoDB**.

The application provides secure authentication, role-based authorization, user management, access-controlled records, JWT-based security, and asynchronous API processing.

The project was developed as a software internship coding challenge and follows a modular full-stack architecture.

---

## ✨ Key Features

### 🔑 Authentication
- User ID and password authentication
- Role-based login
- Admin and General User roles
- JWT-based authentication
- Password hashing using bcrypt
- Protected API routes
- Automatic authorization header through Angular interceptor

### 👥 Role-Based Access Control

| Feature | Admin | General User |
|---|:---:|:---:|
| Login | ✅ | ✅ |
| Dashboard | ✅ | ✅ |
| View Records | ✅ | ✅ |
| View All Records | ✅ | ❌ |
| User Management | ✅ | ❌ |
| Create Users | ✅ | ❌ |
| Update Users | ✅ | ❌ |
| Delete Users | ✅ | ❌ |
| Full Access Level | ✅ | ❌ |
| Limited Access Level | — | ✅ |

The restrictions are intentionally implemented to demonstrate authorization and access-level control.

---

## 🛠️ Technology Stack

### Frontend
- Angular 22
- TypeScript
- HTML5
- CSS3
- RxJS
- Angular Router
- Angular HTTP Client

### Backend
- Node.js
- Express.js
- REST APIs
- JWT
- bcryptjs
- CORS

### Database
- MongoDB
- MongoDB Atlas
- Mongoose

### Development & Deployment
- Git
- GitHub
- Visual Studio Code
- Postman
- Vercel
- Render
- MongoDB Atlas

---

## 🏗️ System Architecture

```text
                    👤 User
                      │
                      ▼
              ┌─────────────────┐
              │ Angular 22      │
              │ Frontend        │
              │ Vercel          │
              └────────┬────────┘
                       │
                       │ HTTPS REST API
                       ▼
              ┌─────────────────┐
              │ Node.js         │
              │ Express.js      │
              │ Backend         │
              │ Render          │
              └────────┬────────┘
                       │
                       │ Mongoose
                       ▼
              ┌─────────────────┐
              │ MongoDB Atlas   │
              │                 │
              │ Users           │
              │ Records         │
              └─────────────────┘
