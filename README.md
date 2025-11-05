
# 🎉 Event Mate – Full Stack Event Management Platform

## 📘 Overview
**Event Mate** is a full-stack web application designed to simplify event organization, booking, and management.  
It connects **users**, **admins**, and **service providers (venues/photographers)** on a single, centralized digital platform.

The system enables real-time event booking, venue availability tracking, and seamless communication between organizers and attendees — built using **React JS**, **Spring Boot**, and **MySQL**.

---

## 🧩 Features
- 🔐 **Role-Based Authentication** – Separate dashboards for Admins and Users.  
- 🗓️ **Event Management** – Create, update, delete, or cancel events dynamically.  
- 🏛️ **Venue Management** – Add and track venue availability in real-time.  
- 📸 **Photographer Management** – Register photographers for specific events.  
- 🧾 **Booking System** – Book and cancel events instantly with backend validation.  
- 🌆 **City & State Filtering** – Search events based on location and type.  
- 🧭 **Session Handling** – Persistent login via Spring `HttpSession`.  
- 💬 **Responsive UI** – Optimized React interface with Tailwind and ShadCN UI.  

---

## 🧱 System Architecture
```

Frontend (React)  <—>  Backend (Spring Boot REST API)  <—>  Database (MySQL)

````

- **Frontend:** Handles UI/UX, routing, and Axios-based API calls.  
- **Backend:** Implements RESTful APIs, validation, and session-based logic.  
- **Database:** Stores all user, event, booking, venue, and photographer data.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React JS, Axios, Tailwind CSS, ShadCN UI |
| **Backend** | Spring Boot (Java), Spring Web, Spring Data JPA, Lombok |
| **Database** | MySQL |
| **Build Tools** | npm, Maven |
| **Testing Tools** | Postman |
| **Version Control** | Git, GitHub |

---

## 🧾 Project Modules

### 👤 User Module
- Register and Login securely.  
- Browse events by type, city, or state.  
- Book or cancel events easily.  
- View booking history and profile.

### 🧑‍💼 Admin Module
- Manage all events, venues, and photographers.  
- Approve or cancel user bookings.  
- Track system activity through dashboard metrics.

### 🏛️ Venue & Photographer Module
- Register venues with capacity and location.  
- Assign photographers for specific events.

---

## 🗂️ Database Design (ER Summary)

**Entities:**
- `User (user_id, name, email, password, role)`
- `Venue (venue_id, name, city, state, capacity, image_link)`
- `Event (event_id, name, type, date, description, venue_id, user_id)`
- `Booking (booking_id, event_id, user_id, status, created_at)`
- `Photographer (photo_id, name, city, contact)`

**Relationships:**
- User ↔ Event → 1:M  
- Venue ↔ Event → 1:M  
- Event ↔ Booking → 1:M  
- User ↔ Booking → 1:M  

---

## 🔁 API Endpoints (Spring Boot)

| Method | Endpoint | Description |
|---------|-----------|-------------|
| `POST` | `/api/users/login` | User login |
| `GET` | `/api/events` | Fetch all events |
| `GET` | `/api/events/{id}` | Get event by ID |
| `POST` | `/api/events` | Add new event |
| `PUT` | `/api/events/{id}` | Update event |
| `DELETE` | `/api/events/{id}` | Delete event |
| `POST` | `/api/bookings` | Book an event |
| `GET` | `/api/bookings/user/{id}` | View user's bookings |

---

## 🧠 Security & Validation
- **Session Management:** Handled via `HttpSession`.  
- **Form Validation:** Required fields in frontend; Bean Validation on backend.  
- **Error Handling:** Global `@ControllerAdvice` for consistent JSON errors.  
- **Data Integrity:** Relationship constraints via JPA annotations.  

---

## 💻 Setup Instructions

### 🧰 Prerequisites
- Node.js (v18 or later)
- JDK 17+
- MySQL Server 8.0+
- Maven
- VS Code or Eclipse IDE

### ⚙️ Backend Setup
1. Open `EVENTMATE_BACKEND` in Eclipse or IntelliJ.
2. Configure MySQL in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/eventmate
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
````

3. Run the Spring Boot application:

   ```bash
   mvn spring-boot:run
   ```
4. Backend runs at: `http://localhost:8080/`

### 💻 Frontend Setup

1. Navigate to `EVENTMATE_FRONTEND`:

   ```bash
   cd EVENTMATE_FRONTEND
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start development server:

   ```bash
   npm start
   ```
4. Frontend runs at: `http://localhost:3000/`

---

## 🧪 Testing APIs with Postman

* Import the Postman collection or manually test endpoints:

  * `GET http://localhost:8080/api/events`
  * `POST http://localhost:8080/api/events`
  * `POST http://localhost:8080/api/bookings`
* Include session or JWT token (if applicable) in headers.

---

## 🚀 Future Enhancements

* 💳 Integrate Razorpay/Stripe payment gateway
* ✉️ Add email/SMS notifications
* 🤖 Implement AI-driven event recommendations
* 📱 Launch mobile app (React Native or Kotlin)
* ☁️ Deploy on AWS EC2 + RDS

---

## 🧾 Troubleshooting

* **NullPointerException:** Ensure session is fetched before linking eventUser.
* **CORS issues:** Add `@CrossOrigin` annotation in controllers.
* **MySQL error “Data truncated”:** Increase column size for image_link.

---

## 👨‍💻 Contributors

* **[K Naveen Kumar]** – Full Stack Developer



## 📎 License

This project is for academic and educational purposes.
© 2025 Event Mate. All rights reserved.

⭐ **If you like this project, give it a star on GitHub!**

