# 📝 To-Do List App

A modern and secure **To-Do List Web Application** built with **React**.
This project allows users to create, manage, and track tasks with authentication and password reset functionality via Gmail.

---

## 🚀 Live Demo

👉 https://to-do-list-gray-three-53.vercel.app/

---

## 🎯 Overview

This project is a fully functional **To-Do List application** with user authentication and secure task management.
Users can sign up, log in, create tasks, mark them as completed, and reset their password using Gmail if they forget it.

Built using **React**, this project demonstrates practical use of authentication flows and email integration.

---

## ✨ Key Features

### 🛡️ Authentication

* Secure user login and registration
* Email-based account verification
* Reset password functionality via Gmail

### ✅ Task Management

* Add, edit, and delete tasks
* Mark tasks as complete or incomplete
* Tasks stored securely for each user

### 📱 Responsive UI

* Works on mobile, tablet, and desktop
* Clean and modern interface using Tailwind CSS

### ⚡ Performance & UX

* Fast and interactive user experience
* Real-time updates with React state management

---

## 🛠️ Tech Stack

* ⚛️ React
* 🎨 Tailwind CSS
* 🔐 Authentication & Password Reset via Gmail
* 🧠 React Hooks (useState, useEffect, useContext)
* 🚀 Vercel (Deployment)

---

## 📂 Project Structure

```bash id="l9z3rt"
src/
│── components/      # Reusable components (Login, Register, TaskItem, etc.)
│── context/         # Authentication & global state
│── pages/           # Main pages (Login, Register, Dashboard)
│── services/        # API calls (Auth, Tasks)
│── App.jsx          # Main application logic
│── index.jsx        # React DOM render
│── styles/          # Tailwind global styles
```

---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash id="y8p4qf"
git clone https://github.com/KerolosAdly59/to-do-list.git
```

2. Navigate to the project folder:

```bash id="k4t7vr"
cd to-do-list
```

3. Install dependencies:

```bash id="v5n3qb"
npm install
```

4. Run the development server:

```bash id="m3l9pf"
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in the root folder and add your Gmail credentials and API keys:

```env id="b7t2kc"
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

> ⚠️ Make sure to configure Firebase Authentication to enable email/password sign-in.

---

## 📈 Future Improvements

* 🌍 Multi-language support
* 📊 Analytics dashboard to track task completion
* 🔔 Notifications for tasks
* 🔒 Two-factor authentication (2FA)

---

## 🧠 What This Project Demonstrates

* Building secure applications with React
* Authentication and password reset flows
* State management with React Hooks and Context API
* Responsive UI design with Tailwind CSS
* Email integration via Gmail

---

## 👨‍💻 Author

Developed by **Kerolos Adly**
🔗 GitHub: https://github.com/KerolosAdly59

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
