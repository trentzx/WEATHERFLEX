// function to fetch weather data from the api
function getWeatherData(location) {
  const apiKey = "eb6be4c806c299461b0d2daa534dd240";

  // verifies link from openweathermap's website that will fetch the data
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  // makes fetch request from said link
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // pulls weather data relevant to what city you searched
      const weatherData = {
        temperature: data.main.temp,
        condition: data.weather[0].main,
        location: data.name,
        // Extract latitude and longitude
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      };

      return weatherData;
    });
}

// function to fetch timezone data
function getTimezoneData(latitude, longitude) {
  // makes an API request from ipgelocation's API and pulls data based on latitude and longitude of the location found from the openweathermap API
  const timezoneApiUrl = `https://api.ipgeolocation.io/timezone?apiKey=c78accefc21b416882e815138fc644cf&lat=${latitude}&long=${longitude}`;
  
  return fetch(timezoneApiUrl)
    .then((response) => response.json())
    .then((data) => {
      // pulls the timezone data from the API
      const timezone = data.timezone;
      return timezone;
    });
}

// this function will visibly update the UI with the weather, timezone, and current time data as well as now the time, timezone and changes the color of the background depending on the weather
function updateUI(weatherData, timezone) {
  const temperature = document.querySelector("#temperature");
  const condition = document.querySelector("#condition");
  const location = document.querySelector("#location");
  const timezoneDisplay = document.querySelector("#timezone");
  const timeDisplay = document.querySelector("#time"); 
  const body = document.querySelector("body");

  // updates the website with the temperature and weather data of said city
  temperature.textContent = `${weatherData.temperature}°C`;
  condition.textContent = weatherData.condition;
  location.textContent = weatherData.location;
  timezoneDisplay.textContent = `Timezone: ${timezone}`;

  // gets the current time from the locations timezone
  const currentTimeInLocation = new Date().toLocaleTimeString("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // visibly updates the current time 
  timeDisplay.textContent = `Current Time: ${currentTimeInLocation}`;

  // defines a mapping of weather conditions to background colors
  const conditionToBackgroundColor = {
    // by setting the weather condtion and then the color it will update when said condition is present
    "Clear": "skyblue",
    "Clouds": "lightgray",
    "Rain": "lightblue",
  };

  // sets the background color based on the weather condition
  const backgroundColor = conditionToBackgroundColor[weatherData.condition];
  if (backgroundColor) {
    body.style.backgroundColor = backgroundColor;
  }
}

// get references to the search button and search bar
const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");

// adds an event listener to the search button
searchBtn.addEventListener("click", () => {
  // gets the location input values from the search bar
  const location = searchBar.value;

  // calls the getWeatherData function with the location and updates the UI
  getWeatherData(location)
    .then((weatherData) => {
      // pulls latitude and longitude from weather data
      const { latitude, longitude } = weatherData;

      // calls the getTimezoneData function with the latitude and longitude
      return getTimezoneData(latitude, longitude)
        .then((timezone) => {
          // updates the UI with weather and timezone data
          updateUI(weatherData, timezone);
        })
        .catch((error) => {
          // will handle any errors related to the ipgeolocation.io API request
          console.log(error);
        });
    })
    .catch((error) => {
      // will handle any errors related to the openeweathermap API request
      console.log(error);
    });
});
