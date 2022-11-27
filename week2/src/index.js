const dateTime = document.querySelector("#date-time");
let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thirsday",
  "Friday",
  "Saturday",
];
let hoursStr = date.getHours() + "";
let hours = hoursStr.length > 1 ? hoursStr : `0${hoursStr}`;
let minutesStr = "" + date.getMinutes();

let minutes = minutesStr.length > 1 ? minutesStr : `0${minutesStr}`;
dateTime.innerHTML = `${days[date.getDay()]} ${hours}:${minutes}`;

let searchBtn = document.querySelector("#search-btn");

// maybe i'll change this
function changeMinutes() {
  setInterval(function () {
    let date = new Date();
    let minutesStr = "" + date.getMinutes();
    let minutes = minutesStr.length > 1 ? minutesStr : `0${minutesStr}`;
    dateTime.innerHTML = `${days[date.getDay()]} ${hours}:${minutes}`;
  }, 60000);
}
changeMinutes();

let h1 = document.querySelector("h1");
let units = "metric";
let searchForm = document.querySelector("#search-form");

//Celsius to fahrenheit
let linkCelsius = document.querySelector("#celsius");
let linkFahrenheit = document.querySelector("#fahrenheit");
let curDegrees = document.querySelector("#current-degrees");
function convertToCelsius() {
  let fahrenheitDegrees = Math.round(((+curDegrees.innerHTML - 32) * 5) / 9);
  return fahrenheitDegrees;
}
function convertToFahrenheit() {
  let celsius = Math.round((9 / 5) * +curDegrees.innerHTML + 32);
  return celsius;
}
linkCelsius.addEventListener("click", (event) => {
  event.preventDefault();
  if (!linkCelsius.classList.contains("active")) {
    curDegrees.innerHTML = convertToCelsius();
    linkCelsius.classList.add("active");
    linkFahrenheit.classList.remove("active");
  }
  units = "metric";
});
linkFahrenheit.addEventListener("click", (event) => {
  event.preventDefault();
  if (!linkFahrenheit.classList.contains("active")) {
    curDegrees.innerHTML = convertToFahrenheit();
    linkCelsius.classList.remove("active");
    linkFahrenheit.classList.add("active");
  }
  units = "imperial";
});
// Search engine
function showTemperature(response) {
  let humidityPar = document.querySelector("#humidity");
  let windPar = document.querySelector("#wind");
  let temperature = Math.round(response.data.main.temp);
  curDegrees.innerHTML = temperature;
  humidityPar.innerHTML = response.data.main.humidity;
  windPar.innerHTML = response.data.wind.speed;
}
let apikey = "88724523008dc9e1be18f6eb6a959b67";
let city = h1.innerHTML;
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${units}`;

axios.get(url).then(showTemperature);
function getCityWeather() {
  let searchInput = document.querySelector("#search-input");
  if (searchInput.value !== "") {
    h1.innerHTML = searchInput.value;
  } else {
    return;
  }
  let city = h1.innerHTML;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${units}`;
  axios.get(url).then((response) => {
    showTemperature(response);
  });
}
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getCityWeather();
});
searchBtn.addEventListener("click", () => getCityWeather());
