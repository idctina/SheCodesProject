
function displayTemp(response){
    
console.log(response.data.main.temp);

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
}

let apiKey = "9b7d33f6403073beaeb267d710f4d217";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${apiKey}&units=metric`;


console.log(apiUrl);
axios.get(apiUrl).then(displayTemp)
