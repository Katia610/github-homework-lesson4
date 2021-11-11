function showCurrentWeatherConditions(response) {
  celsiusTemperature = Math.round(response.data.main.temp);

  let currentTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = `${currentTemperature}`;

  let cityDisplay = document.querySelector("#display-city");
  let currentCity = response.data.name;
  cityDisplay.innerHTML = currentCity;

  let currentWeatherDescription = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#display-comment");
  weatherDescription.innerHTML = `${currentWeatherDescription}`;

  let highTemperature = Math.round(response.data.main.temp_max);
  let lowTemperature = Math.round(response.data.main.temp_min);
  let highLowDisplay = document.querySelector("#high-low");
  highLowDisplay.innerHTML = `High / Low: ${highTemperature}°C / ${lowTemperature}°C`;

  let currentRealFeel = Math.round(response.data.main.feels_like);
  let realFeel = document.querySelector("#real-feel");
  realFeel.innerHTML = `Real Feel: ${currentRealFeel}°C`;

  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;

  let currentIcon = response.data.weather[0].icon;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${currentIcon}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = "8f96c22e12424a3fb4624c20be074503";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeatherConditions);
}

function findCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  let city = cityInput.value;
  searchCity(city);
}

function showPosition(position) {
  let apiKey = "8f96c22e12424a3fb4624c20be074503";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeatherConditions);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayTemperatureInCelsius(event) {
  event.preventDefault();
  unitFahrenheit.classList.remove("active");
  unitCelsius.classList.add("active");
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = celsiusTemperature;
}

function displayTemperatureInFahrenheit(event) {
  event.preventDefault();
  unitFahrenheit.classList.add("active");
  unitCelsius.classList.remove("active");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function greetUser(hour) {
  if (hour > 5 && hour < 12) {
    greeting.innerHTML = "Good morning! 🌞";
  } else {
    if (hour >= 12 && hour < 18) {
      greeting.innerHTML = "Good afternoon! ☕";
    } else {
      if ((hour >= 18) & (hour < 21)) {
        greeting.innerHTML = "Good evening! 🥱";
      } else {
        greeting.innerHTML = "Good night! 😴";
      }
    }
  }
}

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getFullYear();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${date} ${month} ${year}`;

let hour = now.getHours();
let minute = now.getMinutes();

if (hour < 10) {
  hour = `0${hour}`;
}

if (minute < 10) {
  minute = `0${minute}`;
}

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minute}`;

let greeting = document.querySelector("#greeting-message");

greetUser(hour);

let celsiusTemperature = null;

let form = document.querySelector("form");
form.addEventListener("submit", findCity);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

let unitCelsius = document.querySelector("#celsius");
unitCelsius.addEventListener("click", displayTemperatureInCelsius);

let unitFahrenheit = document.querySelector("#fahrenheit");
unitFahrenheit.addEventListener("click", displayTemperatureInFahrenheit);

searchCity("London");
