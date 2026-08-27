# 🍿 Netflix Clone - Web Application

A full-featured Netflix Clone built to recreate the core browsing experience, dynamic movie details, and trailer playback functionality of Netflix using real-time data.

---

## 📌 Project Overview

This project was built to gain hands-on experience with modern React patterns, external API integration, dynamic routing, and asynchronous data fetching.

Instead of hardcoding movie information, the application fetches real-time movie and TV show data directly from **The Movie Database (TMDB) API**. It handles real-time data streaming, state management during API fetch delays, dynamic page creation based on resource IDs, and interactive video embedding.

---

## 🎯 Key Concepts & How It Works

### 1. Dynamic Routing & Parameter Extraction (`useParams`)

- **Resource Identification:** Every movie and TV show has a unique identification number (ID) inside the TMDB database.
- **URL Mapping:** When a user clicks on any movie poster card, React Router captures the movie ID from the URL using the `useParams()` hook (e.g., `/movie/:id`).
- **Targeted Fetching:** The application listens for parameter updates in the URL and executes a targeted API fetch request using that specific ID to populate the detailed view page dynamically without refreshing the page.

### 2. External API Data Fetching & Integration (TMDB API)

- **Home Feed Aggregation:** Executes multiple asynchronous API requests in parallel to populate specialized rows, such as Trending Now, Top Rated, Action Thrillers, Comedies, and Netflix Originals.
- **Comprehensive Details Page:** Queries secondary TMDB endpoints (`/movie/{id}`) to pull rich metadata including budget, box office revenue, production companies, runtime, user ratings, and algorithmically generated recommendations.
- **Trailer Extraction Engine:** Queries the TMDB Video Endpoint (`/movie/{id}/videos`) to locate official media trailers. It extracts the YouTube video key parameter (`key`) and constructs a direct watch URL or embeds an inline player when the user clicks "Play Trailer".

### 3. State Management & Data Manipulation

- **React Hooks:** Leverages `useState` for local UI behaviors (modal toggles, active  categories, hover previews) and `useEffect` for handling asynchronous lifecycle operations.
- **Asynchronous UX & Skeleton Loading:** Implements explicit loading states (`isLoading`) to display fallbacks and prevent unrendered component crashes while waiting for network responses.
- **Array Transformation:** Uses ES6+ methods (`.map()`, `.filter()`, `.slice()`, `.find()`) to cleanse raw JSON payloads, filter out broken images, and format runtime and financial data into human-readable strings.

---

## 🛠️ Tech Stack & Tools

- **Frontend Core:** React.js (JavaScript / JSX)
- **Styling & Design System:** Tailwind CSS
- **Routing Engine:** React Router DOM (v6 / v7)
- **Data Source:** TMDB (The Movie Database) REST API
- **UI Icons:** React Icons / Lucide React
- **HTTP Requests:** Fetch API / Axios

---

## 📂 Project Structure

- **`src/components/`**: Modular presentation components including Banner, MovieRow, Navbar, MovieCard, and VideoModal.
- **`src/pages/`**: View containers mapped to dynamic routes including Home, MovieDetail, and SearchResults.
- **`src/store/`**: Authentication files are executed here for signup and login services.

---

## 🚀 Getting Started Locally

Follow these steps to set up and run the project on your local machine:

### Prerequisites

Make sure you have **Node.js** (v16.0.0 or higher) and **npm** installed on your system.

### Installation

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/GoldCode-27/NETFLIX_APP.git](https://github.com/GoldCode-27/NETFLIX_APP.git)

