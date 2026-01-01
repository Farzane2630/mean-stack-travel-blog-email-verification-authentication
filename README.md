# mean-stack-App

 ## 🚀 In this project I implement a travelblog with register/login forms which has bellow features:

🔐 Signup Endpoint

📧 Sending Verify Account Email

🔍 Verify Email Endpoint

📄 Building a Welcome Email Template

🚪 Logout Endpoint

🔑 Login Endpoint

🔄 Forgot Password Endpoint

🔁 Reset Password Endpoint

✔️ Check Auth Endpoint

**🌐 Frontend Setup**

📋 Signup Page UI

🔓 Login Page UI

✅ Email Verification Page UI

📤 Implementing Signup

📧 Implementing Email Verification

🔒 Protecting Our Routes

🔑 Implementing Login

🏠 Dashboard Page

🔄 Implementing Forgot Password

🚀 Super Detailed Deployment

Setup /backend/.env file

```
MONGO_URI=your_mongo_uri
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development

JWT_SECRET=xxx


NODEMAILER_EMAIL=your email address
NODEMAILER_PASSWORD=your email password


CLIENT_URL=your client/frontend url 
```

Setup /frontend/src/environment/environment.js

```
export const environment = {
  production: false,
  API_AUTH_URL: "http://localhost:5000/api/auth", // Your AUTH API base URL for development
  API_URL: "http://localhost:5000/api", // Your API base URL for development
  IMAGE_BASE_URL: "http://localhost:5000", // Your IMAGE API  base URL for development
};
```

## Prerequisites

Before running the project, make sure you have the following installed on your system:

* **Docker** (version 20+ recommended)
* **Docker Compose** (v2 recommended: `docker compose`)
* **Git** (optional, for cloning the repo)

You do **not** need Node.js, npm, or MongoDB installed locally — everything runs inside Docker.

---

## Project Structure

Your project should have a structure similar to this:

```
project-root/
├── backend/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── package.json
│   └── ...
├── docker-compose.yml
└── README.md
```

---

## Step 1: Environment Variables

Create a `.env` file in the **project root** (same level as `docker-compose.yml`):

```
MONGO_URI=mongodb://mongo:27017/your-db-name
```

> Important:
>
> * `mongo` is the **service name** from Docker Compose, not `localhost`
> * Replace `your-db-name` with your actual database name

---

## Step 2: Install Dependencies (First Run Only)

Because `node_modules` are not included in the image, you must install dependencies inside the containers.

### Backend dependencies

```
docker compose run backend npm install
```

### Frontend dependencies

```
docker compose run frontend yarn install
```

---

## Step 3: Start the Project

From the project root, run:

```
docker compose up
```

Or in detached mode:

```
docker compose up -d
```

Docker will:

* Start MongoDB
* Start the backend server
* Start the frontend development server

---

## Step 4: Access the Application

* **Frontend**: [http://localhost:4200](http://localhost:4200)
* **Backend API**: [http://localhost:5000](http://localhost:5000)
* **MongoDB** (local access): `mongodb://localhost:7017`

---

## Step 5: Stopping the Project

To stop containers:

```
docker compose down
```

To stop and remove volumes (⚠️ deletes database data):

```
docker compose down -v
```

---

## Common Issues & Fixes

### 1. `node_modules` issues

If you get module-related errors:

```
docker compose down
rm -rf backend/node_modules frontend/node_modules
docker compose run backend npm install
docker compose run frontend yarn install
docker compose up
```

---

### 2. Backend cannot connect to MongoDB

Make sure your backend uses this URI:

```
mongodb://mongo:27017/your-db-name
```

❌ `localhost` will NOT work inside Docker containers.

---

### 3. Ports already in use

If ports are busy, change them in `docker-compose.yml`:

```
5000:5000
4200:4200
7017:27017
```

---

## Useful Commands

View running containers:

```
docker ps
```

View logs:

```
docker compose logs -f
```

Restart a single service:

```
docker compose restart backend
```

---

## Notes

* Hot reload works because volumes are mounted
* No local Node or Mongo installation is required
* This setup is optimized for **development**, not production

---

Happy coding 🚀

