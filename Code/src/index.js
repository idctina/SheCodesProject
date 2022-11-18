
function displayTemp(response){
    


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

}

function search(city) {

let apiKey = "9b7d33f6403073beaeb267d710f4d217";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp)
}




function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value)
    console.log(cityInputElement.value);
}

search("New York");

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



let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);