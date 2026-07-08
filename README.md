# MERN Chat App

A full-stack real-time chat application with authentication, live presence, and rich messaging, built on the MERN stack with Socket.IO powering everything that needs to update instantly.

<p align="right">

[View Source Code](https://github.com/Hamzaa09/MERN-ChatApp) &nbsp; | &nbsp;
[Live Demo](https://mern-chat-app-client-six.vercel.app)
</p>


## Overview

A one-on-one chat experience with everything you'd expect from a modern messaging app - real-time delivery, live online status, emoji reactions, and image sharing - wrapped in a secure, authenticated experience.

## Key Features

- **Real-time messaging:** messages delivered instantly via Socket.IO, no polling or refreshing
- **Live online status:** see which users are online in real time as they connect and disconnect
- **Secure authentication:** JWT-based auth with tokens stored in secure cookies
- **Image sharing:** send images in chat, uploaded via Multer and stored on Cloudinary
- **Emoji support:** built-in emoji picker for expressive messaging
- **Global state management:** Redux Toolkit handles auth and chat state across the app

## Tech Stack

**Frontend**

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=mui&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socketdotio&logoColor=white)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socketdotio&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

**Services**

![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)

## Project Structure

```
└── MERN-ChatApp/
    ├── client/     # React + Vite frontend
    │   ├── .gitignore
    │   ├── README.md
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   ├── src
    │   ├── vercel.json
    │   └── vite.config.js
    └── server/     # Express backend, MongoDB, Socket.IO
        ├── .gitignore
        ├── controller
        ├── db
        ├── middlewares
        ├── models
        ├── package-lock.json
        ├── package.json
        ├── routes
        ├── server.js
        ├── socket
        └── utilities
```

## Setup & Run

**1. Clone the repo**
```bash
git clone https://github.com/Hamzaa09/MERN-ChatApp.git
cd MERN-ChatApp
```

**2. Backend setup**
```bash
cd server
npm install
```
Create a `.env` file in `server/` with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
```bash
npm run dev
```

**3. Frontend setup**
```bash
cd client
npm install
```
Create a `.env` file in `client/` with:
```
VITE_API_BASE_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```
```bash
npm run dev
```

> **Note:** never commit real `.env` values - keep them local and add `.env` to `.gitignore`.

## Author

Muhammad Hamza - [github.com/Hamzaa09](https://github.com/Hamzaa09) | [LinkedIn](https://www.linkedin.com/in/muhammad-hamza-109413300/)
