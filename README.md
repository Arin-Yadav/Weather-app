# Atmos - Weather App

Atmos is a responsive weather application for checking current conditions in cities around the world. Search for a city to view its temperature, weather description, and key atmospheric details in a clean, mobile-friendly dashboard.

## Live Demo

Open the deployed app: [Atmos Weather App](https://arin-weather-app.netlify.app)

## Features

- Search current weather by city name
- View temperature and a short weather description
- See humidity, wind speed, pressure, visibility, sunrise, and sunset
- Get helpful feedback for invalid searches, API errors, and network issues
- Use the search field with either the button or the Enter key
- Responsive layout with loading feedback while a search is in progress


## Built With

- [React](https://react.dev/) and [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) for API requests
- [Lucide](https://lucide.dev/) icons
- [OpenWeather map API](https://openweathermap.org/api)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- An API key from [OpenWeather](https://openweathermap.org/api)

### Installation

1. Clone the repository and move into the project directory:

   ```bash
   git clone https://github.com/Arin-Yadav/Weather-app.git
   cd Weather-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your OpenWeather API key:

   ```env
   VITE_API_KEY=your_openweather_api_key
   ```

   Replace `your_openweather_api_key` with your key. Restart the development server after changing environment variables.

4. Start the development server:

   ```bash
   npm run dev
   ```

   Open the local URL printed in the terminal.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create an optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## How to Use

1. Enter a city name in the search field.
2. Select **Search** or press **Enter**.
3. Review the current conditions and weather details.