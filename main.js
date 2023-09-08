// function to fetch weather data from the api 
function getWeatherData(location) {
    const apiKey = "eb6be4c806c299461b0d2daa534dd240";
  
    // verifies link from openweathermap's website that will fetch the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  
    // makes fetch request from said link
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        // pulls weather data relevant to what city you searched 
        const weatherData = {
          temperature: data.main.temp,
          condition: data.weather[0].main,
          location: data.name,
        };
  
        return weatherData;
      });
  }
  
  // this function will visibly update the UI with the weather data
  function updateUI(weatherData) {
    const temperature = document.querySelector("#temperature");
    const condition = document.querySelector("#condition");
    const location = document.querySelector("#location");
  
    // updates the website with the temperature and weather data of said city
    temperature.textContent = `${weatherData.temperature}°C`;
    condition.textContent = weatherData.condition;
    location.textContent = weatherData.location;
  }
  
  // Get references to the search button and search bar
  const searchBtn = document.querySelector("#search-btn");
  const searchBar = document.querySelector("#search-bar");
  
  // Add an event listener to the search button
  searchBtn.addEventListener("click", () => {
    // Get the location input from the search bar
    const location = searchBar.value;
  
    // Call the getWeatherData function with the location and update the UI
    getWeatherData(location)
      .then(weatherData => {
        updateUI(weatherData);
      })
      .catch(error => {
        // Handle any errors that occur during the API request
        console.log(error);
      });
  });