# 🎬 IMDB-Scrapper

A powerful Node.js scraper library that fetches detailed movie and actor information from IMDb. Ideal for building movie apps, data analysis pipelines, or enriching media databases.

---

## 🚀 Features

- ✅ `scrapper(imdbId)` – Retrieve movie metadata (genre, runtime, plot, rating).
- 🏆 `awardsPage(imdbId)` – Get top awards for a given movie.
- 🎭 `getCast(imdbId[, n])` – Fetch cast members (default 20).
- 👥 `getActor(actorId)` – Fetch actor’s profile (name, birthdate, image, etc.).
- 🔍 `searchActor(term)` – Find actors by name.
- 🧩 `simpleSearch(term)` – Lightweight autocomplete search using IMDb’s API.
- 🎥 `getFull(imdbId)` – Get combined metadata, awards, and cast.
- 📺 `episodePage(imdbId, seasonNumber)` – Fetch TV episode data.
- 📈 `getTrendingGenre(genre, n)`, `getTrending(n, type)` – Trending titles by genre or type.
- 🎂 `getStarsBornToday()` / `getStarsBorn(date)` – Birthdays lookup.
- 🖼️ `changeQuality(url, n)` – Adjust image quality (scale 0–5).

---

## 📦 Installation

```bash
npm install --save imdb-scrapper
