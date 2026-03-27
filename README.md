# 🩺 Personal Health and Wellness Tracking System

**Personal Health Tracker** is a full-stack web application that helps users monitor, manage, and improve their personal wellness by tracking health-related data through a secure and user-friendly web interface.

The application is built using a **Spring Boot backend** and a **React frontend**, following clean architecture and RESTful principles.

---

## 📌 Overview

- Manage personal health and wellness data
- Secure user authentication and authorization
- RESTful API-based backend
- Responsive and interactive frontend UI
- Clear separation of frontend and backend layers

---

## ✨ Features

### 🔐 User Management & Authentication
- JWT-based user registration and login
- Secure authentication using JSON Web Tokens (JWT)
- Protected API routes and session-token validation
- Token stored in `localStorage` and cleared upon logout
- User profile editing
- Logout removes token and sensitive data from session

### 🏃 Activity Tracking
- Log daily physical activities
- Track activity duration and calories burned
- View activity history

### 😴 Sleep Logging
- Record daily sleep duration
- Monitor sleep patterns over time
- Analyze sleep consistency

### 💧 Water Intake
- Track daily water consumption
- Set hydration goals
- View daily and weekly intake summaries

### 😊 Mood Tracker
- Log daily mood status
- Identify emotional patterns
- Track mood trends over time

### 🎯 Goals & Progress Module
- Set personal health and wellness goals
- Track progress toward goals
- Visual progress indicators

### 💊 Medication Management
- Add and manage medication schedules
- Track dosage and reminders
- Monitor medication adherence

### 📊 Data Visualization & Insights
- Interactive charts and graphs
- Progress analytics and trend visualization
- Actionable health insights

---

## 🧰 Tech Stack

### Backend
- Java
- Spring Boot
- Maven
- RESTful APIs
- JWT (Authentication & Authorization)

### Frontend
- React (Vite)
- JavaScript
- Axios (API communication)
- Chart.js (Data visualization)
- Tailwind CSS (Styling & responsive UI)
- HTML

### Database
- Mysql

---

## 🚀 Getting Started

### Prerequisites
Ensure the following are installed:

- Java JDK (17 or higher recommended)
- Maven
- Node.js & npm
- Git

---

## 📡 Some Sample API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login | User login |
| GET    | /api/user/profile | Get logged-in user profile |
| PUT    | /api/user/profile | Update user profile |
| GET    | /api/health | Fetch health records |
| POST   | /api/health | Add a health record |
| PUT    | /api/health/{id} | Update health record |
| DELETE | /api/health/{id} | Delete health record |

---

## 📥 Clone the Repository

```bash
git clone https://github.com/Athika-Athar/personal-health-tracker.git
cd personal-health-tracker

#Running the Backend
cd Healthtrackerbackend
mvn clean install
mvn spring-boot:run

#Running the Frontend
cd HealthtrackerFrontend/wellnesshubfrontend
npm install
npm run dev
```

