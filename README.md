# Ride-Booking-api
# 🚖 Ride Booking Backend API

A ride booking management system built with **Node.js, Express, TypeScript, and MongoDB**.  
It supports **Riders, Drivers, and Admins** with role-based authentication, ride management, and administrative control.  

---

## 📌 Project Overview

This project is designed to simulate a **real-world ride-hailing backend system** like Uber or Pathao.  
It allows **riders** to request rides, **drivers** to accept and complete them, and **admins** to monitor and manage the platform.  

The system follows a **modular architecture** with models, controllers, and routes separated for scalability and maintainability.  

---

## ✨ Features

### 🔑 Authentication & Authorization
- JWT-based authentication for all users (Rider, Driver, Admin)
- Secure password hashing with **bcrypt**
- Role-based access control (Rider, Driver, Admin)

### 👤 Rider Features
- Request a new ride
- View ride history
- Cancel a ride (before driver accepts)
- Secure login & signup

### 🚘 Driver Features
- View available ride requests
- Accept a ride request
- Start and complete rides
- Manage availability status

### 🛠 Admin Features
- View all users (riders & drivers)
- Approve or block drivers
- Manage ride history
- Access to all system activities

---

## 🛠 Tech Stack

- **Backend Framework**: Express.js with TypeScript  
- **Database**: MongoDB with Mongoose ODM  
- **Authentication**: JSON Web Token (JWT)  
- **Password Security**: bcrypt  
- **Error Handling**: express-async-handler  
- **Environment Management**: dotenv  

---

## 📡 API Endpoints

### 🔑 Auth Routes
| Method | Endpoint           | Description |
|--------|--------------------|-------------|
| POST   | `/api/auth/signup` | Register new user (Rider/Driver/Admin) |
| POST   | `/api/auth/login`  | Login and get JWT token |

---

### 👤 Rider Routes
| Method | Endpoint                  | Description |
|--------|---------------------------|-------------|
| POST   | `/api/rides/request`      | Request a new ride |
| GET    | `/api/rides/history/:id`  | Get ride history for a rider |
| PUT    | `/api/rides/cancel/:id`   | Cancel a ride |

---

### 🚘 Driver Routes
| Method | Endpoint                   | Description |
|--------|----------------------------|-------------|
| GET    | `/api/drivers`             | Get all drivers (Admin only) |
| GET    | `/api/drivers/:id`         | Get driver by ID |
| GET    | `/api/rides/available`     | Get all available ride requests |
| PUT    | `/api/rides/accept/:id`    | Accept a ride |
| PUT    | `/api/rides/start/:id`     | Start a ride |
| PUT    | `/api/rides/complete/:id`  | Complete a ride |

---

### 🛠 Admin Routes
| Method | Endpoint                 | Description |
|--------|--------------------------|-------------|
| GET    | `/api/admin/users`       | Get all users |
| PUT    | `/api/admin/block/:id`   | Block a user |
| PUT    | `/api/admin/unblock/:id` | Unblock a user |
| GET    | `/api/admin/rides`       | Get all rides |

---


