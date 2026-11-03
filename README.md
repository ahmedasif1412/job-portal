# Job Portal

A full-stack job portal built with the MERN stack (MongoDB, Express, React, Node.js). **Recruiters** post jobs and **job seekers** browse and apply to them. Authentication uses JWT, and access is controlled by user role.

## Live Demo

- **Frontend:** `https://your-app.vercel.app`
- **Backend API:** `https://your-api.onrender.com`

> The backend runs on Render's free tier, so the first request after a period of inactivity can take 30-60 seconds while the server wakes up.

## Features

**Authentication**

- Register as a Job Seeker or a Recruiter
- Passwords hashed with bcrypt
- Login returns a JWT (valid for 1 day)
- Auto-login on page refresh using the saved token

**Recruiter**

- Post a job (title, company, location, description)
- Delete their own jobs (applications to a deleted job are removed too)

**Job Seeker**

- Browse all posted jobs, newest first
- Apply to a job (duplicate applications are blocked)
- View a "My Applications" list

## Tech Stack

| Layer    | Technology                               |
| -------- | ---------------------------------------- |
| Frontend | React 18, Vite, Redux Toolkit, plain CSS |
| Backend  | Node.js, Express 4                       |
| Database | MongoDB Atlas, Mongoose                  |
| Auth     | JSON Web Tokens (jsonwebtoken), bcryptjs |
| Hosting  | Vercel (client), Render (server)         |

## Project Structure

```
job-portal/
├── client/
│   └── src/
│       ├── api/            # fetch functions (auth.js, job.js)
│       ├── components/     # Auth.jsx, Dashboard.jsx, JobItem.jsx
│       ├── store/          # Redux store, authSlice, jobSlice
│       ├── App.jsx
│       ├── App.css
│       └── main.jsx
└── server/
    ├── config/db.js            # MongoDB connection
    ├── controller/             # user.controller.js, job.controller.js
    ├── middleware/auth.js      # verifyToken (JWT check)
    ├── model/                  # user, job, application schemas
    ├── routes/                 # user.routes.js, job.routes.js
    └── server.js
```

## Getting Started (Local)

### Prerequisites

- Node.js 18 or later
- A MongoDB Atlas cluster (or a local MongoDB instance)

### 1. Clone the repository

```bash
git clone https://github.com/ahmedasif1412/job-portal.git
cd job-portal
```

### 2. Set up the server

```bash
cd server
npm install
```

Create a `.env` file inside `server/`, using `.env.example` as a template:

```env
MONGO_URI = 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/job_portal_db'
PORT = 5000
JWT_SECRET = 'replace_with_a_long_random_string'
```

| Variable     | Description                                         |
| ------------ | --------------------------------------------------- |
| `MONGO_URI`  | Your MongoDB connection string                      |
| `PORT`       | Port the API runs on (default `5000`)               |
| `JWT_SECRET` | Secret used to sign tokens. Use a long random value |

Start the server:

```bash
npm run dev
```

You should see `Connected to Database!` and `The server is running at: http://localhost:5000`.

### 3. Set up the client

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

By default the client talks to `http://localhost:5000`. To point it at a different API, create `client/.env`:

```env
VITE_API_URL=https://your-api.onrender.com
```

## API Reference

Base URL: `http://localhost:5000/api`

### Auth

| Method | Endpoint    | Auth | Description                                             |
| ------ | ----------- | ---- | ------------------------------------------------------- |
| POST   | `/register` | No   | Create an account (`name`, `email`, `password`, `role`) |
| POST   | `/login`    | No   | Log in, returns `token`, `id`, `name`, `role`           |
| GET    | `/user`     | Yes  | Get the currently logged-in user                        |

### Jobs

All job routes require the header `Authorization: Bearer <token>`.

| Method | Endpoint                  | Role      | Description                 |
| ------ | ------------------------- | --------- | --------------------------- |
| GET    | `/jobs`                   | Any       | List all jobs, newest first |
| POST   | `/jobs`                   | Recruiter | Create a job                |
| DELETE | `/jobs/:id`               | Recruiter | Delete a job you posted     |
| POST   | `/jobs/:id/apply`         | Seeker    | Apply to a job              |
| GET    | `/jobs/applications/mine` | Seeker    | List your own applications  |

## Data Models

- **User:** `name`, `email` (unique), `password` (hashed), `role` (`seeker` or `recruiter`)
- **Job:** `title`, `company`, `location`, `description`, `postedBy` (user)
- **Application:** `job` (job), `user` (user)

## Deployment

**Backend (Render)**

1. Create a new Web Service from this repo with the root directory set to `server`.
2. Build command: `npm install`. Start command: `npm start`.
3. Add the environment variables `MONGO_URI` and `JWT_SECRET`.
4. In MongoDB Atlas, allow Render to connect under **Network Access**.

**Frontend (Vercel)**

1. Import this repo with the root directory set to `client`.
2. Add the environment variable `VITE_API_URL` set to your Render URL (no trailing slash).
3. Deploy. Redeploy whenever `VITE_API_URL` changes, since Vite reads it at build time.

## Known Limitations and Future Improvements

- Recruiters cannot yet view who applied to their jobs
- Role is chosen at sign-up with no verification
- No job editing, search or filtering
- No pagination on the jobs list
- Token is stored in `localStorage`

## Author

**Ahmed Asif**
GitHub: [@ahmedasif1412](https://github.com/ahmedasif1412)
