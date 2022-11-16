let weather = {
  paris: { temperature: 15.5, humidity: 75 },

  tokyo: { temperature: 20, humidity: 60 },

  melbourne: { temperature: 20, humidity: 70 },

  milan: { temperature: 30, humidity: 55 }
};

//l/e/t city = prompt("Enter a city");

//if (weather[city] !== undefined) {//
//let temperature = weather[city].temperature;
//let humidity = weather[city].humidity;
/// let temperatureC = Math.round(temperature);
//let temperatureF = Math.round(temperature * 1.8 + 32);

//alert(
//`It is currently ${temperatureC}°C/ ${temperatureF}°F in ${city} with the humidity of ${humidity}%`
//);
//} else {
//alert(
// `We're sorry, we do not know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
// );
//}
let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDay = document.querySelector(".right-paragraph");
currentDay.innerHTML = `${day} <br/> ${hours}:${minutes}`;

function searchCity(city) {
  let apiKey = "445905dadb3d2b0c6f1b916c9d0e3860";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  console.log(response.data);
  let cityResult = document.querySelector("#cityResult");
  cityResult.innerHTML = `Currently in ${response.data.name}`;
  let tempResult = document.querySelector("#temp");
  tempResult.innerHTML = ` It is ${Math.round(response.data.main.temp)}°C`;
  let humidityResult = document.querySelector("#humidity");
  humidityResult.innerHTML = `With the humidity of ${Math.round(
    response.data.main.humidity
  )}%`;
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchBarCity = document.querySelector("#searchForm");
searchBarCity.addEventListener("submit", showCity);

function showCurrentWeather(response) {
  let currentLocation = document.querySelector(".currentLocation");
  let temperature = Math.round(response.data.main.temp);
  currentLocation.innerHTML = `It is currently ${temperature}° in ${response.data.name}`;
}

function showCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "445905dadb3d2b0c6f1b916c9d0e3860";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
let currentLocationButton = document.querySelector("#search-current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
