# React Weather App – Product Requirements Document (PRD)

## 1. Project Title
**React Weather App**  
A responsive web application to display current weather and forecast for any city using a weather API.

## 2. Purpose
Allow users to quickly check weather conditions including temperature, humidity, wind, and forecast, with a clean and interactive interface.

## 3. Scope
- Search weather by city name
- Display current weather (temperature, description, humidity, wind, weather icon)
- Display 5-day forecast (optional)
- Support Celsius and Fahrenheit
- Responsive design for desktop and mobile

## 4. Features

| Feature | Description | Priority |
|---------|------------|----------|
| City search | Type a city name to get weather | High |
| Current weather | Show temperature, description, humidity, wind | High |
| 5-day forecast | Show next 5 days weather | Medium |
| Unit toggle | Switch between °C and °F | Medium |
| Responsive design | Works on desktop, tablet, mobile | High |
| Error handling | Display message for invalid city/API failure | High |
| Loading indicator | Show spinner while fetching data | Medium |

## 5. User Stories
1. Search for a city to see current weather.
2. View the weather forecast for the next 5 days.
3. Switch between Celsius and Fahrenheit.
4. Access app on desktop and mobile.
5. Receive error messages for invalid cities.

## 6. Technical Requirements
- **Frontend:** React.js, React Hooks
- **API:** OpenWeatherMap (or similar)
- **HTTP Requests:** Axios or Fetch
- **State Management:** React useState/useEffect
- **Styling:** CSS / TailwindCSS / Bootstrap
- **Icons:** Weather icons from API or FontAwesome

## 7. Design & UX 
- Clean interface with cards for current weather and forecast
- Weather icons (sun, clouds, rain)
- Input box for city search wi

