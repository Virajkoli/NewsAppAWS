# News App - MERN Stack

A full-stack news application built with MongoDB, Express, React, and Node.js that fetches news from News API.

## Features

- 📰 Browse latest news headlines
- 🔍 Search for specific news articles
- 📂 Filter news by categories (Business, Technology, Entertainment, Health, Science, Sports)
- 💾 Save favorite articles to database
- 🎨 Responsive and modern UI
- ⚡ Fast and efficient

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Axios for API calls
- CORS enabled

### Frontend

- React 18
- React Router for navigation
- Axios for API calls
- CSS for styling

## Project Structure

```
NewsAppAWS/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── newsController.js
│   ├── models/
│   │   └── SavedArticle.js
│   ├── routes/
│   │   └── newsRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── NewsCard.js
│   │   │   ├── NewsCard.css
│   │   │   ├── NewsList.js
│   │   │   ├── NewsList.css
│   │   │   ├── SavedArticles.js
│   │   │   ├── SavedArticles.css
│   │   │   ├── SearchBar.js
│   │   │   └── SearchBar.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .env
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- News API Key from [newsapi.org](https://newsapi.org/)

## Installation

### 1. Clone the repository or navigate to the project directory

```bash
cd "d:\Codes\My Projects\NewsAppAWS"
```

### 2. Install all dependencies

You can install all dependencies at once:

```bash
npm run install-all
```

Or install separately:

```bash
# Install root dependencies
npm install

# Install backend dependencies
npm run install-backend

# Install frontend dependencies
npm run install-frontend
```

### 3. Set up environment variables

#### Backend (.env in backend folder)

Edit `backend/.env` and add your News API key:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/newsapp
NEWS_API_KEY=your_actual_news_api_key_here
NEWS_API_URL=https://newsapi.org/v2
```

**Important:** Replace `your_actual_news_api_key_here` with your actual API key from [newsapi.org](https://newsapi.org/)

#### Frontend (.env in frontend folder)

The frontend `.env` is already configured:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Set up MongoDB

**Option 1: Local MongoDB**

- Make sure MongoDB is installed and running on your machine
- The app will connect to `mongodb://localhost:27017/newsapp`

**Option 2: MongoDB Atlas (Cloud)**

- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster
- Get your connection string
- Replace `MONGODB_URI` in `backend/.env` with your Atlas connection string

## Running the Application

### Option 1: Run everything together (Recommended)

```bash
npm run dev
```

This will start both the backend server and frontend development server concurrently.

### Option 2: Run separately

**Terminal 1 - Backend:**

```bash
npm run dev-backend
```

Backend will run on http://localhost:5000

**Terminal 2 - Frontend:**

```bash
npm run start-frontend
```

Frontend will run on http://localhost:3000

## Usage

1. Open your browser and navigate to http://localhost:3000
2. Browse the latest news headlines on the home page
3. Click on category buttons to filter news by category
4. Use the search bar to search for specific news topics
5. Click "Save" on any article to save it to your database
6. Navigate to "Saved Articles" to view your saved articles
7. Click "Read More" to open the full article in a new tab
8. Click "Delete" to remove saved articles

## API Endpoints

### News Endpoints

- `GET /api/news/headlines` - Get top headlines
- `GET /api/news/category/:category` - Get news by category
- `GET /api/news/search?q=query` - Search news articles

### Saved Articles Endpoints

- `POST /api/news/saved` - Save an article
- `GET /api/news/saved` - Get all saved articles
- `DELETE /api/news/saved/:id` - Delete a saved article

### Health Check

- `GET /api/health` - Check if server is running

## News API Information

This app uses the [News API](https://newsapi.org/) to fetch news articles.

**Free Tier Limitations:**

- 100 requests per day
- News articles up to 1 month old
- Developer plan only

For production use, consider upgrading to a paid plan.

**Available Categories:**

- General
- Business
- Technology
- Entertainment
- Health
- Science
- Sports

## Building for Production

### Build Frontend

```bash
npm run build-frontend
```

This creates an optimized production build in the `frontend/build` folder.

### Deploy Backend

1. Set up environment variables on your hosting platform
2. Ensure MongoDB is accessible
3. Start the server with `npm start` in the backend folder

## Troubleshooting

### Backend won't start

- Check if MongoDB is running
- Verify your `.env` variables are correct
- Make sure port 5000 is not in use

### Frontend can't connect to backend

- Verify backend is running on port 5000
- Check the proxy setting in `frontend/package.json`
- Verify `REACT_APP_API_URL` in `frontend/.env`

### News not loading

- Verify your News API key is valid
- Check if you've exceeded the API rate limit (100 requests/day on free tier)
- Check browser console and server logs for errors

### MongoDB connection error

- Ensure MongoDB is running
- Check connection string in `backend/.env`
- If using MongoDB Atlas, verify IP whitelist settings

## License

ISC

## Contributing

Feel free to fork this project and submit pull requests!

## Support

For issues or questions, please create an issue in the repository.
