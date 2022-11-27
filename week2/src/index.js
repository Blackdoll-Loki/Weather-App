function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thirsday",
    "Friday",
    "Saturday",
  ];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
const searchBtn = document.querySelector("#search-btn");
const kyiv = document.querySelector("#kyiv");
const lviv = document.querySelector("#lviv");
const odessa = document.querySelector("#odessa");

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
  const humidityPar = document.querySelector("#humidity");
  const windPar = document.querySelector("#wind");
  const dateTime = document.querySelector("#date-time");
  const weatherDescription = document.querySelector("#weather-description");
  const icon = document.querySelector("#weather-icon");
  let temperature = Math.round(response.data.main.temp);
  curDegrees.innerHTML = temperature;
  humidityPar.innerHTML = response.data.main.humidity;
  windPar.innerHTML = Math.round(response.data.wind.speed);
  dateTime.innerHTML = formatDate(response.data.dt * 1000);
  weatherDescription.innerHTML = response.data.weather[0].main;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  console.log(response.data);
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
kyiv.addEventListener("click", () => {
  city = kyiv.innerHTML;
  h1.innerHTML = city;
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${units}`;
  axios.get(url).then(showTemperature);
});
lviv.addEventListener("click", () => {
  city = lviv.innerHTML;
  h1.innerHTML = city;
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${units}`;
  axios.get(url).then(showTemperature);
});
odessa.addEventListener("click", () => {
  city = odessa.innerHTML;
  h1.innerHTML = city;
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${units}`;
  axios.get(url).then(showTemperature);
});
