# 💬 TalkHub — Real-Time Chat & Collaboration Platform

TalkHub is a full-stack real-time communication and collaboration platform that enables users to register, authenticate, communicate, and exchange messages through a modern web application.

The project is built using **React.js, Node.js, Express.js, MongoDB, JWT, and real-time communication technologies**.

---

## 📌 Table of Contents

* [Project Overview](#-project-overview)
* [Features](#-features)
* [Technology Stack](#-technology-stack)
* [System Architecture](#-system-architecture)
* [Project Structure](#-project-structure)
* [Application Flow](#-application-flow)
* [Authentication Flow](#-authentication-flow)
* [Chat Flow](#-chat-flow)
* [Database Design](#-database-design)
* [Prerequisites](#-prerequisites)
* [Installation](#-installation)
* [Environment Variables](#-environment-variables)
* [Running the Project](#-running-the-project)
* [API Endpoints](#-api-endpoints)
* [Frontend Structure](#-frontend-structure)
* [Backend Structure](#-backend-structure)
* [Real-Time Communication](#-real-time-communication)
* [Security](#-security)
* [Error Handling](#-error-handling)
* [Troubleshooting](#-troubleshooting)
* [Development Workflow](#-development-workflow)
* [Future Improvements](#-future-improvements)
* [Learning Outcomes](#-learning-outcomes)
* [Author](#-author)

---

# 🚀 Project Overview

TalkHub is designed as a real-time communication platform where users can create accounts, securely log in, find other users, and exchange messages.

The application follows a client-server architecture:

```text
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      Client         │
                    └──────────┬──────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
       ┌────────────────┐          ┌──────────────────┐
       │  MongoDB Atlas │          │ Socket.IO /      │
       │    Database    │          │ Real-Time Layer  │
       └────────────────┘          └──────────────────┘
```

---

# ✨ Features

## 👤 User Management

* User registration
* User login
* User authentication
* JWT-based authentication
* Password protection
* User profile information
* Fetch available users

## 💬 Messaging

* Send messages
* Receive messages
* Store messages in MongoDB
* Retrieve previous messages
* User-to-user communication
* Real-time communication

## ⚡ Real-Time Communication

The platform supports real-time communication using a socket-based architecture.

When a message is sent:

```text
User A
   ↓
Frontend
   ↓
Backend
   ↓
MongoDB
   ↓
Real-Time Event
   ↓
User B
```

This allows messages to appear without continuously refreshing the page.

## 🔐 Security

* JWT authentication
* Password hashing
* Environment variables for secrets
* Protected backend routes
* Authentication middleware
* Database credentials kept outside source code

---

# 🛠 Technology Stack

## Frontend

| Technology        | Purpose                 |
| ----------------- | ----------------------- |
| React.js          | User interface          |
| JavaScript        | Application logic       |
| HTML5             | Structure               |
| CSS3              | Styling                 |
| Fetch API / Axios | API communication       |
| Socket.IO Client  | Real-time communication |

## Backend

| Technology | Purpose                 |
| ---------- | ----------------------- |
| Node.js    | JavaScript runtime      |
| Express.js | Backend framework       |
| MongoDB    | Database                |
| Mongoose   | MongoDB ODM             |
| JWT        | Authentication          |
| bcrypt     | Password hashing        |
| Socket.IO  | Real-time communication |
| Nodemon    | Development server      |

---

# 🏗 System Architecture

TalkHub follows a layered full-stack architecture.

```text
┌─────────────────────────────────────────────┐
│                  FRONTEND                   │
│                                             │
│ React Components                            │
│       ↓                                     │
│ Pages / UI                                  │
│       ↓                                     │
│ API Calls                                   │
│       ↓                                     │
│ Socket.IO Client                            │
└──────────────────────┬──────────────────────┘
                       │
                       │ HTTP / WebSocket
                       ▼
┌─────────────────────────────────────────────┐
│                  BACKEND                    │
│                                             │
│ Express Server                              │
│       ↓                                     │
│ Routes                                      │
│       ↓                                     │
│ Middleware                                  │
│       ↓                                     │
│ Controllers / Business Logic                │
│       ↓                                     │
│ Models                                      │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │     MongoDB      │
              │                 │
              │ Users           │
              │ Messages        │
              │ Other Data      │
              └─────────────────┘
```

---

# 📁 Project Structure

A typical TalkHub structure is:

```text
TalkHub/
│
├── backend/
│   │
│   ├── controllers/
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │
│   ├── routes/
│   │
│   ├── server.js
│   │
│   └── ...
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── .env
├── package.json
├── package-lock.json
└── README.md
```

> The exact folder names can vary depending on the existing implementation.

---

# 🔄 Application Flow

## 1. User Registration

```text
User
 ↓
Registration Form
 ↓
React Frontend
 ↓
POST /api/auth/register
 ↓
Express Backend
 ↓
Validate Input
 ↓
Hash Password
 ↓
MongoDB
 ↓
User Created
 ↓
Response
 ↓
Frontend
```

---

# 🔐 Authentication Flow

TalkHub uses JWT-based authentication.

## Registration

```text
User enters:

Name
Email
Password

       ↓

React
       ↓
POST /register
       ↓
Express
       ↓
bcrypt password hashing
       ↓
MongoDB
```

The password should never be stored as plain text.

Instead:

```text
Password
   ↓
bcrypt
   ↓
Hashed Password
   ↓
MongoDB
```

---

## Login

```text
User
 ↓
Login Form
 ↓
React
 ↓
POST /login
 ↓
Express
 ↓
Find User
 ↓
Compare Password
 ↓
Generate JWT
 ↓
Return Authentication Response
 ↓
Frontend
```

The JWT is then used to authenticate protected requests.

---

# 🎫 JWT Authentication

JWT stands for:

**JSON Web Token**

A simplified token structure is:

```text
Header.Payload.Signature
```

The backend creates the token using a secret:

```javascript
jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET
);
```

The secret should be stored inside `.env`.

Example:

```env
JWT_SECRET=your_secret_key
```

Never commit this secret to GitHub.

---

# 💬 Chat Flow

When User A sends a message to User B:

```text
User A
   │
   ▼
React Chat Interface
   │
   ▼
POST Message / Socket Event
   │
   ▼
Express Backend
   │
   ├───────────────► MongoDB
   │                    │
   │                    ▼
   │               Message Stored
   │
   ▼
Real-Time Event
   │
   ▼
Socket.IO
   │
   ▼
User B
   │
   ▼
React Chat Interface
```

---

# 🗄 Database Design

TalkHub uses MongoDB.

MongoDB stores information in collections instead of traditional relational tables.

Possible collections include:

```text
Database
│
├── users
│
└── messages
```

## Users Collection

A user document may contain:

```json
{
    "_id": "ObjectId",
    "name": "John",
    "email": "john@example.com",
    "password": "hashed_password"
}
```

## Messages Collection

A message document may contain:

```json
{
    "_id": "ObjectId",
    "sender": "ObjectId",
    "receiver": "ObjectId",
    "message": "Hello!",
    "createdAt": "2026-09-28T10:00:00Z"
}
```

The exact fields depend on the implementation.

---

# ☁️ MongoDB Atlas

The project can use MongoDB Atlas as the cloud database.

A MongoDB connection string generally looks like:

```text
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/talkhub
```

The actual connection string should never be committed to GitHub.

---

# ⚙️ Prerequisites

Before running TalkHub, install:

* Node.js
* npm
* MongoDB Atlas account
* Git
* Modern web browser

Recommended Node.js version:

```text
Node.js 20 LTS
```

Check your versions:

```bash
node -v
npm -v
```

---

# 📥 Installation

## 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

Move into the project:

```bash
cd TalkHub
```

---

# 📦 Install Backend Dependencies

From the project root:

```bash
npm install
```

If the backend has a separate `package.json`, enter the backend directory first:

```bash
cd backend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file according to the environment variables expected by the existing backend.

Example:

```env
PORT=5000

MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/talkhub

JWT_SECRET=your_jwt_secret

NODE_ENV=development
```

The exact variable names should match the code in the project.

For example, if the code contains:

```javascript
process.env.MONGO_URI
```

then the `.env` file must contain:

```env
MONGO_URI=...
```

---

# 🔒 Generate a JWT Secret

A secure random secret can be generated using:

```bash
openssl rand -hex 32
```

Example output:

```text
a8f2c7d9...
```

Then:

```env
JWT_SECRET=a8f2c7d9...
```

---

# ▶️ Running the Backend

From the project root:

```bash
npm start
```

The existing project uses Nodemon during development.

Typical command:

```text
nodemon backend/server.js
```

A successful backend startup should indicate that:

```text
Server is running
MongoDB connected
```

The exact messages depend on the implementation.

---

# ▶️ Running the Frontend

Open another terminal.

Navigate to the frontend:

```bash
cd TalkHub/frontend
```

Install dependencies:

```bash
npm install
```

Then run the command specified by the frontend's `package.json`.

For example, if the project uses Vite:

```bash
npm run dev
```

If it uses Create React App:

```bash
npm start
```

Check `frontend/package.json` to determine the correct command.

---

# 🌐 Local Development

A typical development setup may look like:

```text
Frontend
http://localhost:5173

        ↓

Backend
http://localhost:5000

        ↓

MongoDB Atlas
```

The actual frontend/backend ports depend on the project configuration.

---

# 🔌 API Endpoints

The exact routes depend on the current implementation.

Typical authentication endpoints:

## Register

```http
POST /api/auth/register
```

Example request:

```json
{
    "name": "John",
    "email": "john@example.com",
    "password": "password123"
}
```

---

## Login

```http
POST /api/auth/login
```

Example:

```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

---

## Get Users

```http
GET /api/users
```

Returns registered users according to the backend implementation.

---

## Get Messages

```http
GET /api/messages
```

Possible response:

```json
[
    {
        "_id": "123",
        "sender": "user1",
        "receiver": "user2",
        "message": "Hello"
    }
]
```

---

## Send Message

```http
POST /api/messages
```

Example:

```json
{
    "sender": "USER_ID",
    "receiver": "USER_ID",
    "message": "Hello!"
}
```

> Use the routes actually defined in `backend/routes` as the authoritative API list for this project.

---

# 🔄 GET vs POST

TalkHub uses different HTTP methods depending on the operation.

## GET

Used to retrieve information.

Example:

```http
GET /api/messages
```

Meaning:

```text
Client → Server
"Give me the messages."
```

---

## POST

Used to send/create information.

Example:

```http
POST /api/messages
```

Meaning:

```text
Client → Server
"Create this new message."
```

---

# 🧩 Backend Components

## Routes

Routes define API endpoints.

Example:

```javascript
router.get("/messages", getMessages);

router.post("/messages", sendMessage);
```

---

## Controllers

Controllers contain application logic.

Example:

```javascript
const getMessages = async (req, res) => {
    // Fetch messages
};
```

---

## Models

Models define the MongoDB document structure.

Example:

```javascript
const messageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    message: String
});
```

---

## Middleware

Middleware runs between the incoming request and the final route handler.

```text
Request
   ↓
Middleware
   ↓
Controller
   ↓
Response
```

Authentication middleware can verify JWT tokens before allowing access to protected routes.

---

# ⚡ Real-Time Communication

For real-time chat, a socket-based connection can be maintained between the client and server.

Traditional HTTP:

```text
Client → Request
Server → Response
```

Real-time communication:

```text
Client ←────────→ Server
       Persistent
       Connection
```

This allows the server to notify connected clients when new events occur.

---

# 🧪 Testing the Application

After starting both frontend and backend:

### Test 1 — Registration

Create a new account.

Verify:

```text
User created
     ↓
MongoDB users collection
```

### Test 2 — Login

Enter valid credentials.

Verify:

```text
Login successful
     ↓
Authentication token/session
```

### Test 3 — Users

Open the user list.

Verify:

```text
Frontend
   ↓
GET /api/users
   ↓
Backend
   ↓
MongoDB
```

### Test 4 — Send Message

Select another user and send:

```text
Hello!
```

Verify:

```text
Message appears in chat
```

### Test 5 — Persistence

Refresh the browser.

The previous messages should be retrieved from MongoDB if persistence is implemented.

### Test 6 — Real-Time Messaging

Open the application in two browser windows.

```text
Browser A → User A
Browser B → User B
```

Send a message from A to B and verify that B receives it through the real-time mechanism.

---

# 🛡 Security

The application should follow these security practices:

### Passwords

Never store:

```text
password123
```

directly in MongoDB.

Instead:

```text
password123
     ↓
bcrypt
     ↓
hashed password
```

### JWT Secret

Never expose:

```env
JWT_SECRET=...
```

to the frontend.

### MongoDB Credentials

Never commit:

```env
MONGO_URI=...
```

to a public repository.

### `.gitignore`

The project should contain:

```gitignore
node_modules/
.env
.DS_Store
```

---

# 🐛 Troubleshooting

## MongoDB Authentication Failed

Error:

```text
Error: bad auth : Authentication failed.
```

Check:

1. MongoDB username
2. MongoDB password
3. MongoDB Atlas database user
4. MongoDB connection string
5. Special characters in password

Example:

```text
@ → %40
# → %23
```

---

## MongoDB Connection Warning

You may see:

```text
useNewUrlParser is a deprecated option
```

or:

```text
useUnifiedTopology is a deprecated option
```

These are MongoDB driver deprecation warnings.

They are not authentication errors.

With modern MongoDB drivers, these options are no longer necessary.

---

# ❌ Port Already in Use

If you see:

```text
EADDRINUSE
```

another process is already using the port.

Check:

```bash
lsof -i :5000
```

Then terminate the process if appropriate:

```bash
kill <PID>
```

---

# ❌ npm Script Not Found

If you see:

```text
npm error Missing script: "dev"
```

check:

```bash
cat package.json
```

Look at:

```json
"scripts": {
    ...
}
```

Run one of the scripts that actually exists.

For example:

```bash
npm start
```

or:

```bash
npm run dev
```

---

# ❌ Module Not Found

Example:

```text
Cannot find module 'express'
```

Run:

```bash
npm install
```

If dependencies are corrupted:

```bash
rm -rf node_modules
npm install
```

Do not delete `package-lock.json` unless there is a specific reason.

---

# 🔄 Development Workflow

A typical development workflow is:

```text
1. Start MongoDB Atlas
        ↓
2. Start Backend
        ↓
3. Backend connects to MongoDB
        ↓
4. Start Frontend
        ↓
5. Open browser
        ↓
6. Register/Login
        ↓
7. Select user
        ↓
8. Send message
        ↓
9. Backend stores message
        ↓
10. Real-time event delivered
        ↓
11. Receiver sees message
```

---

# 🧠 Complete Request Flow

Suppose User A sends:

```text
"Hello User B!"
```

The complete flow is:

```text
┌──────────────┐
│   User A     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ React Client │
└──────┬───────┘
       │
       │ POST /api/messages
       ▼
┌──────────────┐
│   Express    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Middleware   │
│ JWT Verify   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Controller   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Mongoose   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   MongoDB    │
└──────────────┘

       │
       ▼

┌──────────────┐
│ Socket Layer │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   User B     │
│    React     │
└──────────────┘
```

---

# 📊 Project Learning Outcomes

This project provides practical experience with:

* Full-stack application development
* React.js
* Node.js
* Express.js
* MongoDB
* Mongoose
* REST APIs
* HTTP methods
* JWT authentication
* Password hashing
* Middleware
* Controllers
* Routing
* Database operations
* Real-time communication
* Socket-based architecture
* Environment variables
* API debugging
* Client-server architecture
* Git and GitHub

---

# 🚀 Future Improvements

Potential improvements include:

* Group chat
* Typing indicators
* Online/offline status
* Message read receipts
* Message delivery status
* File sharing
* Image sharing
* Voice messages
* Video calling
* Message reactions
* Message editing
* Message deletion
* Search messages
* User profile customization
* Push notifications
* Email notifications
* End-to-end encryption
* Redis for scalable real-time communication
* Docker deployment
* CI/CD pipeline
* Cloud deployment
* Automated testing

---

# 🐳 Docker Deployment

The project can later be containerized using Docker.

Possible architecture:

```text
                 Docker
                   │
       ┌───────────┼───────────┐
       │           │           │
       ▼           ▼           ▼
   Frontend     Backend     Database
    Container   Container    MongoDB
```

For production deployments, MongoDB Atlas can continue to be used as the managed database.

---

# 🌍 Production Architecture

A production deployment could look like:

```text
                    Internet
                       │
                       ▼
                ┌─────────────┐
                │   Browser   │
                └──────┬──────┘
                       │
                       ▼
                ┌─────────────┐
                │   Frontend  │
                │   Hosting   │
                └──────┬──────┘
                       │
                 HTTPS / API
                       │
                       ▼
                ┌─────────────┐
                │   Backend   │
                │   Server    │
                └──────┬──────┘
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
       ┌─────────────┐   ┌─────────────┐
       │  MongoDB    │   │  Socket.IO  │
       │   Atlas     │   │ Connections │
       └─────────────┘   └─────────────┘
```

---

# 📌 Important Environment Files

Never commit sensitive environment variables.

Recommended:

```text
.env
```

and:

```text
.env.example
```

Example `.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

The `.env.example` file can safely be committed because it contains placeholders rather than real credentials.

---

# 👨‍💻 Development Commands

## Install dependencies

```bash
npm install
```

## Start backend

```bash
npm start
```

## Start frontend

Use the script defined in:

```text
frontend/package.json
```

For example:

```bash
npm run dev
```

## Check Node version

```bash
node -v
```

## Check npm version

```bash
npm -v
```

## Check Git status

```bash
git status
```

---

# 📜 License

This project is developed for educational, portfolio, and software development purposes.

---

# 👨‍💻 Author

**Shyam Chauhan**

M.Tech in Computer Science & Engineering — Artificial Intelligence
IIIT Vadodara

B.Tech in Computer Engineering
Dharmsinh Desai University, Nadiad

---

# ⭐ Project Summary

**TalkHub** is a full-stack real-time communication platform demonstrating the integration of:

```text
React
  +
Node.js
  +
Express.js
  +
MongoDB
  +
Mongoose
  +
JWT
  +
Socket-Based Real-Time Communication
```

The project demonstrates how a modern full-stack application handles authentication, API communication, database operations, and real-time messaging from frontend to backend and database.
