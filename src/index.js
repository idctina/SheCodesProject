






function displayTemp(response){
    
celsiusTemperature = response.data.main.temp;


let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(response.data.main.temp);

let cityElement = document.querySelector("#city");
cityElement.innerHTML =response.data.name;

let conditionElement = document.querySelector("#condition");
conditionElement.innerHTML = response.data.weather[0].description;

let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = response.data.main.humidity;

let windElement = document.querySelector("#wind");
windElement.innerHTML = Math.round(response.data.wind.speed);

let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`);

getForecast(response.data.coord);
}
 // metric to imperial pt.2 

function displayFahrenheit(event) {
    event.preventDefault();
    let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
// removing active class of celsisusLink
celsiusLink.classList.remove("active");
// adding active class to fahrenheitLink
fahrenheitLink.classList.add("active");
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(fahrenheitTemp);
}



//search engine
function search(city) {

let apiKey = "3980a7c8f2a782241a093131b099f993";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp)
}




function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value)
    console.log(cityInputElement.value);
}
//forecast pt. 2 (i guess, its been a lot)
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();

    let days = ["Sun", "Mon","Tue","Wed", "Thu", "Fri","Sat"];
    return days[day];

}

//forecast
function displayForecast(response) {
let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");
let forecastHTML =`<div class="row">`;
let days =["Sun", "Mon","Tue","Wed", "Thu"];
forecast.forEach(function(forecastDay, index) {
if (index < 6) {

forecastHTML = forecastHTML + `
    
    <div class="col-2"> 
 <div class="weather-forecast-date">
${formatDay(forecastDay.dt)}
</div>

<img 
src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="50"/>
  
<div class="weather-forecast-temps"> 
<span class="weather-forecast-temp-max">
${Math.round(forecastDay.temp.max)}??
</span>

<span class="weather-forecast-temp-min">
   ${Math.round(forecastDay.temp.min)}??
</span>

</div> 
</div> 


`;
}

});


    forecastHTML = forecastHTML +`</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "3980a7c8f2a782241a093131b099f993";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

//time 
let now = new Date();
 
let currentTime = document.querySelector("#date");

let date = now.getDate();
let hour = now.getHours();

if (hour < 10) {
  hour = `0${hour}`; }
let min = now.getMinutes();

if (min < 10) {
  min = `0${min}`;}


let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"];

let day = days[now.getDay()];

currentTime.innerHTML = `${day} ${hour}:${min}`;

// (reverting to celsius) pt.2
function displayCelsius(event){
    event.preventDefault();

    // adding/removing classes pt.2
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let tempElement= document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(celsiusTemperature);
}

// metric to imperical pt. 3

let celsiusTemperature = null;


// search engine pt.2 
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// converting metric to imperical pt.1
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

// metric to imperical pt. 4 (reverting to celsius)

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

function showCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "445905dadb3d2b0c6f1b916c9d0e3860";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
let currentLocationButton = document.querySelector("#search-current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);



search("London");