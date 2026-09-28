# 💬 TalkHub — Real-Time Chat & Collaboration Platform

TalkHub is a full-stack real-time chat and collaboration platform that enables users to securely register, authenticate, communicate, and exchange messages through a modern web application.

The project demonstrates the integration of a React frontend, Node.js/Express backend, MongoDB database, JWT-based authentication, and real-time communication.

---

## 📌 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [Technology Stack](#-technology-stack)
* [Architecture](#-architecture)
* [Project Structure](#-project-structure)
* [Application Flow](#-application-flow)
* [Authentication Flow](#-authentication-flow)
* [Messaging Flow](#-messaging-flow)
* [Database](#-database)
* [Prerequisites](#-prerequisites)
* [Installation](#-installation)
* [Environment Configuration](#-environment-configuration)
* [Running the Project](#-running-the-project)
* [API Overview](#-api-overview)
* [Backend Architecture](#-backend-architecture)
* [Frontend Architecture](#-frontend-architecture)
* [Real-Time Communication](#-real-time-communication)
* [Security](#-security)
* [Testing](#-testing)
* [Troubleshooting](#-troubleshooting)
* [Future Improvements](#-future-improvements)
* [Learning Outcomes](#-learning-outcomes)
* [Author](#-author)

---

# 🚀 Overview

TalkHub is a full-stack communication platform designed to provide real-time interaction between users.

The application follows a client-server architecture:

```text
┌──────────────────────┐
│   React Frontend     │
│      Client          │
└──────────┬───────────┘
           │
           │ HTTP / Real-Time Connection
           ▼
┌──────────────────────┐
│ Node.js + Express    │
│      Backend         │
└──────────┬───────────┘
           │
      ┌────┴─────┐
      │          │
      ▼          ▼
┌──────────┐  ┌──────────────┐
│ MongoDB  │  │ Real-Time    │
│ Database │  │ Communication│
└──────────┘  └──────────────┘
```

---

# ✨ Features

## 👤 User Authentication

* User registration
* User login
* JWT-based authentication
* Password hashing
* Protected API routes
* User session/authentication management

## 💬 Messaging

* Send messages between users
* Retrieve previous messages
* Store messages in MongoDB
* User-to-user communication
* Real-time message delivery

## ⚡ Real-Time Communication

The application supports real-time communication so that users can exchange messages without continuously refreshing the page.

## 🗄️ Database

MongoDB is used to store application data such as:

* User information
* Authentication-related data
* Messages
* Conversation-related information

## 🔐 Security

* Password hashing
* JWT authentication
* Protected backend routes
* Environment variables for sensitive configuration
* Database credentials kept outside the source code

---

# 🛠 Technology Stack

## Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Fetch API / HTTP client
* Real-time communication client

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt
* Nodemon

## Development Tools

* Git
* GitHub
* VS Code
* npm

---

# 🏗 Architecture

TalkHub follows a layered full-stack architecture:

```text
                    ┌───────────────┐
                    │     User      │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ React Client  │
                    └───────┬───────┘
                            │
                       HTTP / Socket
                            │
                            ▼
                    ┌───────────────┐
                    │    Express    │
                    │    Server     │
                    └───────┬───────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
        ┌───────────────┐       ┌───────────────┐
        │ Authentication│       │ Message Logic │
        └───────┬───────┘       └───────┬───────┘
                │                       │
                └───────────┬───────────┘
                            ▼
                    ┌───────────────┐
                    │    MongoDB    │
                    └───────────────┘
```

---

# 📁 Project Structure

The project is organized into frontend and backend components.

```text
TalkHub/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── ...
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

> `.env` is used for local configuration and should not be committed to the repository.

---

# 🔄 Application Flow

The general application flow is:

```text
User
  │
  ▼
React Frontend
  │
  ▼
API Request
  │
  ▼
Express Backend
  │
  ▼
Authentication / Business Logic
  │
  ▼
MongoDB
  │
  ▼
Response
  │
  ▼
React Frontend
```

---

# 🔐 Authentication Flow

TalkHub uses JWT-based authentication.

## Registration

```text
User
 ↓
Registration Form
 ↓
React Frontend
 ↓
Backend API
 ↓
Validate User Data
 ↓
Hash Password
 ↓
Store User
 ↓
MongoDB
```

Passwords are not stored as plain text.

The password is processed using a hashing mechanism before being stored.

---

## Login

```text
User
 ↓
Login Form
 ↓
React Frontend
 ↓
Login API
 ↓
Find User
 ↓
Verify Password
 ↓
Generate Authentication Token
 ↓
Return Authentication Response
 ↓
Frontend
```

Protected requests can then use the authentication mechanism to verify the user.

---

# 💬 Messaging Flow

When a user sends a message:

```text
User A
  │
  ▼
React Chat Interface
  │
  ▼
Backend API / Real-Time Connection
  │
  ▼
Message Processing
  │
  ├──────────────► MongoDB
  │                    │
  │                    ▼
  │               Message Stored
  │
  ▼
Real-Time Event
  │
  ▼
User B
  │
  ▼
React Chat Interface
```

This allows messages to be both persisted and delivered to users through the application's communication layer.

---

# 🗄 Database

TalkHub uses **MongoDB** as its database.

MongoDB stores data using collections and documents.

Possible collections include:

```text
Database
│
├── Users
│
└── Messages
```

## User Data

A user document can contain information such as:

```text
User
├── Name
├── Email
├── Password Hash
└── Other User Information
```

## Message Data

A message can contain information such as:

```text
Message
├── Sender
├── Receiver
├── Message Content
└── Timestamp
```

The exact fields depend on the implementation.

---

# 📋 Prerequisites

Before running the project, make sure the following are installed:

* Node.js
* npm
* MongoDB / MongoDB Atlas
* Git
* Modern web browser

The project is currently developed and tested with a modern Node.js LTS version.

Check your installation:

```bash
node -v
```

```bash
npm -v
```

---

# 📥 Installation

## 1. Clone the Repository

```bash
git clone <repository-url>
```

Move into the project:

```bash
cd TalkHub
```

---

## 2. Install Dependencies

Install backend/project dependencies:

```bash
npm install
```

If the frontend contains its own `package.json`, install its dependencies as well:

```bash
cd frontend
npm install
```

---

# 🔑 Environment Configuration

TalkHub uses environment variables for configuration and sensitive information.

Create a local `.env` file according to the variables required by the backend.

Example structure:

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret>
```

### Important

Do **not** put real credentials in the README.

Do **not** commit `.env` to GitHub.

The repository should contain:

```text
.env
```

inside `.gitignore`.

A safe `.env.example` can be provided for other developers:

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
```

This file contains placeholders only.

---

# ▶️ Running the Project

## Start Backend

From the project root:

```bash
npm start
```

The backend starts the Node.js/Express server.

During development, Nodemon can automatically restart the server when source files change.

---

## Start Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies if required:

```bash
npm install
```

Then run the frontend using the script defined in its `package.json`.

For example, a Vite-based frontend can use:

```bash
npm run dev
```

The exact command depends on the frontend configuration.

---

# 🌐 Local Development

During development, the application consists of:

```text
┌─────────────────────┐
│ React Frontend      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Express Backend     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ MongoDB             │
└─────────────────────┘
```

The frontend and backend ports are determined by the project's configuration.

---

# 🔌 API Overview

TalkHub uses REST APIs for communication between the frontend and backend.

Typical operations include:

| Method    | Purpose                         |
| --------- | ------------------------------- |
| POST      | Create/register/login/send data |
| GET       | Retrieve data                   |
| PUT/PATCH | Update data                     |
| DELETE    | Delete data                     |

Examples of application operations include:

```text
POST    Authentication / Registration
POST    Authentication / Login
GET     Users
GET     Messages
POST    Messages
```

The exact API routes are defined in the backend route files.

---

# 📡 HTTP Request Example

When the frontend requests user information:

```text
React
  │
  │ GET request
  ▼
Express API
  │
  ▼
Controller
  │
  ▼
MongoDB
  │
  ▼
Response
  │
  ▼
React
```

For creating a message:

```text
React
  │
  │ POST request
  ▼
Express API
  │
  ▼
Message Controller
  │
  ▼
MongoDB
  │
  ▼
Response
```

---

# 🧩 Backend Architecture

The backend follows a modular architecture.

## Routes

Routes define the application's API endpoints.

```text
Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
```

---

## Middleware

Middleware performs processing before the request reaches the controller.

Examples include:

* Authentication
* Token verification
* Request validation
* Error handling

Flow:

```text
Request
  ↓
Middleware
  ↓
Controller
  ↓
Response
```

---

## Controllers

Controllers contain the application's business logic.

For example:

```text
User Controller
    ↓
User operations

Message Controller
    ↓
Message operations

Authentication Controller
    ↓
Registration / Login
```

---

## Models

Mongoose models define how application data is represented in MongoDB.

```text
Model
  ↓
Schema
  ↓
MongoDB Collection
```

---

# ⚡ Real-Time Communication

Real-time communication allows connected users to receive updates without repeatedly refreshing the page.

Traditional API communication:

```text
Client → Request → Server
Client ← Response ← Server
```

Real-time communication:

```text
Client ←──────────────→ Server
       Persistent
       Connection
```

This architecture is useful for chat applications because messages can be delivered immediately to connected users.

---

# 🔐 Security

TalkHub follows several security practices.

### Password Security

Passwords should be hashed before being stored.

```text
Plain Password
      ↓
Password Hashing
      ↓
Password Hash
      ↓
Database
```

### JWT Security

Authentication secrets are stored using environment variables.

### Environment Variables

Sensitive configuration should remain outside the source code.

Examples:

```text
Database credentials
Authentication secrets
API keys
Private configuration
```

### Git Protection

The `.gitignore` file should include:

```gitignore
node_modules
.env
```

This prevents local dependencies and environment credentials from being committed.

---

# 🧪 Testing the Application

After starting the backend and frontend, test the application in the following order.

## 1. Registration

Create a new user account.

Verify that registration succeeds.

---

## 2. Login

Use the newly created account.

Verify that authentication succeeds.

---

## 3. User List

Verify that users can be retrieved from the backend.

---

## 4. Messaging

Select another user and send a message.

Verify that the message appears in the conversation.

---

## 5. Message Persistence

Refresh the application.

Verify that previously stored messages can be retrieved from the database.

---

## 6. Real-Time Communication

Open the application in two browser windows.

```text
Browser A
   │
 User A
   │
   └────── Message ──────►
                           │
                           ▼
                       Browser B
                         User B
```

Verify that messages are delivered through the real-time communication layer.

---

# 🐛 Troubleshooting

## MongoDB Authentication Error

If you see:

```text
Authentication failed
```

check the MongoDB database credentials and local environment configuration.

Do not put the credentials directly into source files.

---

## Missing Dependencies

If you see:

```text
Cannot find module
```

run:

```bash
npm install
```

If necessary:

```bash
rm -rf node_modules
npm install
```

---

## Port Already in Use

If the backend port is already occupied, check the process using it:

```bash
lsof -i :5000
```

Stop the process if necessary.

---

## npm Script Not Found

If you see:

```text
npm error Missing script
```

check the available scripts:

```bash
npm run
```

or inspect:

```text
package.json
```

Use the script defined by the project.

---

# 🔄 Development Workflow

The general development workflow is:

```text
1. Start MongoDB
       ↓
2. Start Backend
       ↓
3. Backend connects to MongoDB
       ↓
4. Start Frontend
       ↓
5. Open Application
       ↓
6. Register / Login
       ↓
7. Select User
       ↓
8. Send Message
       ↓
9. Store Message
       ↓
10. Deliver Real-Time Update
```

---

# 📈 Future Improvements

Potential future enhancements include:

* Read receipts
* Message delivery status
* Message reactions
* Message editing
* Message deletion
* File sharing
* Image sharing
* Voice messages
* Video calling
* Message search
* User profile customization
* End-to-end encryption

---

# 🎓 Learning Outcomes

This project provides practical experience with:

* Full-stack web development
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
* Client-server architecture
* Environment variables
* Git and GitHub
* Debugging and deployment concepts

---

# 📌 Key Concepts Demonstrated

### Client

The React application running in the user's browser.

### Server

The Node.js/Express application responsible for API requests, authentication, business logic, and database operations.

### Database

MongoDB stores persistent application data.

### API

The communication layer between the frontend and backend.

### Authentication

JWT-based authentication is used to identify and protect users.

### Real-Time Communication

A persistent communication mechanism is used to deliver chat updates between connected clients.

---

# 📊 Complete Project Flow

```text
                         TALKHUB
                            │
                            ▼
                    ┌──────────────┐
                    │    React     │
                    │   Frontend   │
                    └──────┬───────┘
                           │
                    HTTP / Real-Time
                           │
                           ▼
                    ┌──────────────┐
                    │    Express   │
                    │    Server    │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
        Authentication  Messages    Other APIs
              │            │
              └──────┬─────┘
                     │
                     ▼
              ┌──────────────┐
              │   Mongoose   │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │    MongoDB   │
              └──────────────┘

                     │
                     ▼
              Real-Time Layer
                     │
             ┌───────┴───────┐
             ▼               ▼
          User A           User B
```

---

# 👨‍💻 Author

## Shyam Chauhan

M.Tech in Computer Science & Engineering — Artificial Intelligence
IIIT Vadodara

B.Tech in Computer Engineering
Dharmsinh Desai University, Nadiad

---

# ⭐ Project Summary

TalkHub is a full-stack real-time communication platform that demonstrates the integration of:

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
JWT Authentication
   +
Real-Time Communication
```

The project demonstrates how a modern full-stack application handles authentication, API communication, database operations, and real-time messaging.
