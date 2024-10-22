# Real-Time Weather Monitoring System

The Real-Time Weather Monitoring System is a React-based web application that displays weather information of various cities using the OpenWeatherMap API. The application fetches real-time weather data and visualizes the temperature forecasts on dynamic charts. It also issues alerts when the temperature exceeds a specified threshold.
## Features

- Displays real-time weather data for multiple cities.
- Temperature forecast with interactive line charts using Chart.js.
- Automatic alerts when the temperature crosses a threshold.
- Expandable weather cards showing additional weather details.
- Responsive design using Material UI.and Uses local storage to persist daily weather summaries.


## Tech Stack

Frontend: React, Vite

Styling: Material UI

Charts: React Chart.js 2

API: OpenWeatherMap API

Toast Notifications: react-toastify

State Management: React hooks (useState, useEffect)

Other: axios (for API requests), Local Storage

## Setup Instructions
### Prerequisites
Make sure you have the following installed on your machine:

- Node.js (v14+)
- npm or yarn
Clone the repository

   
  git clone https://github.com/HARISHsPareek/Harish_assignment2.git 
  

      cd weather
Install dependencies

    npm install
#### or
    yarn install

### Set up API keys
Create a .env file in the root directory and add your OpenWeatherMap API key:
or add your API key in src/App.jsx

    YOUR_API_KEY=your_openweathermap_api_key
### Run the application
Start the Vite development server:

    npm run dev
#### or
    yarn dev
The app will be available at http://localhost:5173.

Build the application
To create an optimized production build, run:

    npm run build
### or
    yarn build
The build output will be located in the dist/ folder.

### Docker Instructions
Build Docker Image
Ensure Docker is installed on your system. Then, create a Docker image by running:

    docker build -t weather-monitoring 


#### Run Docker Container

To run the application in a Docker container, use the following command:


    docker run -p 3000:3000 weather-monitoring
The app will be accessible at http://localhost:3000.
