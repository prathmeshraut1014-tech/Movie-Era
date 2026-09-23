🎬 MovieEra – Full Stack Movie Application

A modern movie discovery app where users can browse movies, search, view details, and save favorites.

Frontend → React + Vite + Tailwind CSS
Backend → Spring Boot + MySQL + JWT Authentication
Movie Data → TMDB API

✨ Features
🔍 Search movies by title
🔥 Browse popular movies
📄 Detailed movie information (overview, rating, poster, etc.)
🔐 User Registration & Login (JWT)
❤️ Add / Remove favorite movies
📚 Personal Favorites library
🎨 Clean, modern, responsive UI
📁 Project Structure
MovieEraFull/
├── backend/                 → Spring Boot API (Auth + Favorites)
│   ├── src/main/java/...
│   ├── src/main/resources/application.properties
│   └── pom.xml
│
├── frontend/                → React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
│
└── README.md                → This file
🛠️ Tech Stack
Layer	Technology
Frontend	React 19, Vite, Tailwind CSS, Axios, React Router
Backend	Spring Boot 3.3, Java 17, Spring Security, JWT
Database	MySQL 8
Movie API	The Movie Database (TMDB)
🚀 How to Run Locally
Prerequisites
Java 17+
Maven
Node.js 18+
MySQL 8 (running on port 3306)
1. Start MySQL

Make sure MySQL is running and create a database (optional – the app can create it automatically).

Default credentials used in the project:

Username: root
Password: 12345 (change this!)
2. Start the Backend
cd backend

Edit src/main/resources/application.properties and update your MySQL password:

spring.datasource.password=YOUR_MYSQL_PASSWORD

Then run:

mvn spring-boot:run

Backend will start at:

http://localhost:8080

3. Start the Frontend

Open a new terminal:

cd frontend
npm install
npm run dev

Frontend will start at:

http://localhost:5173

📱 How to Use the App
Open http://localhost:5173
Click Login → Create a new account (or login)
Go to Library or Search to find movies
Click the ❤️ heart icon or Add to Favorites on a movie
Visit the Favorites page to see all saved movies
🔌 API Endpoints
Method	Endpoint	Description	Auth Required
POST	/api/auth/register	Register new user	No
POST	/api/auth/login	Login user	No
GET	/api/favorites	Get user's favorites	Yes
POST	/api/favorites	Add a favorite	Yes
DELETE	/api/favorites/{tmdbId}	Remove a favorite	Yes
🌐 Environment Variables
Frontend .env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_API_URL=http://localhost:8080/api
Backend application.properties
spring.datasource.url=`jdbc:mysql://root:yKZoYIjNsWWzMyfAdGhnPTQhGuDwDNnK@mysql.railway.internal:3306/railway`
spring.datasource.username=root
spring.datasource.password=yourpassword
app.jwt.secret=YourVeryLongSecretKeyHere
📦 Deployment
Service	Recommended Platform
Frontend	Vercel / Render / Netlify
Backend	Render / Railway
Database	Render Postgres / Railway MySQL / PlanetScale

See the individual frontend/README.md and backend/README.md for more detailed deployment notes.

🐛 Common Issues
Problem	Solution
Backend fails to start	Check MySQL is running + correct password
"Failed to load favorites"	Make sure you are logged in
CORS errors	Backend must run on port 8080
TMDB movies not loading	Check VITE_TMDB_API_KEY in frontend .env
📄 License

This project is for educational / personal use.

Made with ❤️ for movie lovers
