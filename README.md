# URL Shortener – Full Stack Project

A complete URL Shortener built using **Node.js + Express + TypeScript + PostgreSQL** (backend) and **React + TypeScript + Vite** (frontend).  
Features include short-link creation, custom codes, redirects with click tracking, deletion, stats page, and responsive UI.

---

## 📌 Features
- Create short links (auto or custom 6–8 alphanumeric codes)
- Validate URLs and prevent duplicate codes (409)
- 302 redirect with click counter & last-click tracking
- Delete links (404 after deletion)
- Stats page → `/code/:code`
- Dashboard with table, search, copy buttons, badges
- Health check → `/healthz`
- Fully responsive UI

---

## 🏗 Tech Stack
**Backend:** Node.js, Express, TypeScript, PostgreSQL, pg  
**Frontend:** React, TypeScript, Vite, React Router, Axios  

---

## 📁 Project Structure

## Root structure

url-shortener/
  server/
    src/
      config/
      controllers/
      errors/
      repositories/
      routes/
      services/
      utils/
      app.ts
      server.ts
    package.json
    tsconfig.json
    .env.example
  client/
    src/
      api/
      components/
      pages/
      router/
      main.tsx
    index.html
    package.json
    tsconfig.json
    vite.config.ts
    .env.example
