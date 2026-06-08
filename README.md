# TravelBlog — MEAN Stack ✈️

A full-stack travel blog application with a complete authentication system: JWT-based login, email verification, password reset, and protected routes — containerized with Docker for a one-command local setup.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-mean--stack--travel--blog.vercel.app-4CAF50?style=for-the-badge&logo=vercel&logoColor=white)](https://mean-stack-travel-blog-email-verifi.vercel.app)

---

## What This Project Demonstrates

This isn't just a login form. It's a production-grade auth system covering the full security lifecycle:

- **Stateless JWT authentication** with secure token handling
- **Email verification flow** — users must confirm their email before accessing the app
- **Forgot / reset password** via tokenized email links
- **Route guards** on the Angular frontend to protect authenticated pages
- **Dockerized** full-stack environment (Angular + Node.js + MongoDB) with a single `docker compose up`
- **Nodemailer** integration for transactional email with a custom HTML template

---

## Tech Stack

**Frontend**

![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat-square&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-hotpink?style=flat-square&logo=sass&logoColor=white)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-22B573?style=flat-square&logo=gmail&logoColor=white)

**Infrastructure**

![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker%20Compose-2496ED?style=flat-square&logo=docker&logoColor=white)

---

## Auth Flow

```
Register → Send verification email → Verify email → Login → JWT issued
                                                          ↓
                                              Access protected routes
                                                          ↓
                              Forgot password → Reset link via email → New password
```

### API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/verify-email` | Verify email with token |
| POST | `/api/auth/login` | Login, returns JWT |
| POST | `/api/auth/logout` | Invalidate session |
| POST | `/api/auth/forgot-password` | Send reset email |
| POST | `/api/auth/reset-password/:token` | Set new password |
| GET  | `/api/auth/check-auth` | Verify current session |

---

## Project Structure

```
├── backend/
│   ├── controllers/      # Auth logic
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routes
│   ├── middleware/        # JWT verification
│   ├── emails/           # Nodemailer + HTML templates
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/     # Login, signup, verify, reset pages
│   │   │   ├── guards/   # Route protection
│   │   │   └── services/ # Auth service + HTTP interceptors
│   │   └── environments/
├── docker-compose.yml
└── README.md
```

---

## Run Locally with Docker

> No Node.js or MongoDB installation required — everything runs inside containers.

**1. Clone the repo**

```bash
git clone --depth=1 https://github.com/Farzane2630/mean-stack-travel-blog-email-verification-authentication.git
cd mean-stack-travel-blog-email-verification-authentication
```

**2. Create `/backend/.env`**

```env
MONGO_URI=mongodb://mongo:27017/travelblog
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development

NODEMAILER_EMAIL=your_email@gmail.com
NODEMAILER_PASSWORD=your_app_password

CLIENT_URL=http://localhost:4200
```

> Note: use `mongo` (not `localhost`) as the host — it's the Docker Compose service name.

**3. Create `/frontend/src/environments/environment.js`**

```js
export const environment = {
  production: false,
  API_AUTH_URL: "http://localhost:5000/api/auth",
  API_URL: "http://localhost:5000/api",
  IMAGE_BASE_URL: "http://localhost:5000",
};
```

**4. Install dependencies**

```bash
docker compose run backend npm install
docker compose run frontend yarn install
```

**5. Start everything**

```bash
docker compose up
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:4200 |
| Backend API | http://localhost:5000 |
| MongoDB | mongodb://localhost:7017 |

**Stop the project**

```bash
docker compose down          # stop containers
docker compose down -v       # stop + delete database volumes
```

---

## Troubleshooting

**Module errors after pulling new changes:**
```bash
docker compose down
rm -rf backend/node_modules frontend/node_modules
docker compose run backend npm install
docker compose run frontend yarn install
docker compose up
```

**Port already in use:** edit the port mappings in `docker-compose.yml`.

**MongoDB connection refused:** make sure your `MONGO_URI` uses `mongo` not `localhost`.

---

## Author

**Farzane Kazemi**

[![GitHub](https://img.shields.io/badge/github-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Farzane2630)
[![LinkedIn](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/farzane-kazemi/)
