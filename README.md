# ✍️ Blog

A simple and elegant **Blog App** built with **Node.js**, **Express**, and **MongoDB**.  
It includes user authentication, CRUD operations for posts, and a responsive design for reading and writing anywhere.

---

## 🚀 Live Demo

👉 [View Live App](https://blog-3rab.onrender.com/)

---

## ✨ Features

- 🔐 **User authentication** with JWT and bcrypt.
- ✍️ **Create, edit, delete, and search** blog posts.
- 👤 **Guest login** support.
- ⚡ **Session & flash messages** for alerts.
- 📱 **Responsive UI** with EJS templates.
- 🧭 **Dashboard** for logged-in users.

---

## 🧰 Tech Stack

| Category       | Technology                      |
| -------------- | ------------------------------- |
| **Backend**    | Node.js + Express               |
| **Views**      | EJS                             |
| **Database**   | MongoDB + Mongoose              |
| **Auth**       | JWT + bcrypt                    |
| **Testing**    | Jest                            |
| **Session**    | express-session + connect-mongo |
| **Middleware** | method-override, flash          |
| **Deployment** | Render.com                      |

---

## ⚙️ CI/CD & Automation

This project includes a full GitHub Actions workflow for continuous integration, testing, and deployment:

- **Continuous Integration (CI)**

  - Runs on `push` or `pull_request` events to `master`.
  - Lints code with **ESLint**.
  - Builds the project.
  - Runs **unit and integration tests** using **Jest**.

- **Continuous Deployment (CD)**

  - Automatic deployment to **Render** after CI succeeds.
  - Manual approval required for production deployment.
  - Discord notifications for successful production deployments.
  - [CI/CD Discord channel here!](https://discord.com/channels/1433886988158763124/1433886988980719819)

- **Performance & Quality Checks**

  - Weekly **Lighthouse audits** scheduled with GitHub Actions.
  - Dependabot keeps **npm dependencies** and **GitHub Actions** up-to-date weekly.

- **Reusable Workflows**
  - CI tasks are modularized in a **reusable workflow** for maintainability and consistency.
