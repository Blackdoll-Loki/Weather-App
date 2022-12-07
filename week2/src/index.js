function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
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
function formatDay(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

async function displayForecast(response) {
  let data = await response.data;
  let forecastContainer = document.querySelector("#cards");
  let forcastHTML = `<div class="cards" id="cards">`;
  if (data.daily) {
    let forecast = data.daily;
    console.log(forecast);
    forecast.forEach((day, idx) => {
      if (idx > 0 && idx < 6) {
        forcastHTML =
          forcastHTML +
          `<div class="card" id="card">
            <h6 class="card-day">${formatDay(day.time * 1000)}</h6>
            <img class="card-icon" src=${day.condition.icon_url}></img>
              <p class="max-min-temperatures">
                <span class="card-weather-max">${Math.round(
                  day.temperature.maximum
                )}&deg</span>
                <span class="card-weather-min">${Math.round(
                  day.temperature.minimum
                )}&deg</span>
              </p>
          </div>`;
      }
    });
  }
  forcastHTML = forcastHTML + `</div>`;
  forecastContainer.innerHTML = forcastHTML;
}
function convertToCelsius() {
  let fahrenheitDegrees = Math.round(((+curDegrees.innerHTML - 32) * 5) / 9);
  return fahrenheitDegrees;
}
function convertToFahrenheit() {
  let celsius = Math.round((9 / 5) * +curDegrees.innerHTML + 32);
  return celsius;
}
// Search engine
function getForecast(coordinates) {
  //console.log(coordinates);
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  //console.log(apiURL);

  axios.get(apiURL).then(displayForecast);
}

function showTemperature(response) {
  console.log(response);
  const humidityPar = document.querySelector("#humidity");
  const windPar = document.querySelector("#wind");
  const dateTime = document.querySelector("#date-time");
  const weatherDescription = document.querySelector("#weather-description");
  const icon = document.querySelector("#weather-icon");
  console.log(response.data.temperature.current);
  let temperature = Math.round(response.data.temperature.current);
  curDegrees.innerHTML = temperature;
  humidityPar.innerHTML = response.data.temperature.humidity;
  windPar.innerHTML = Math.round(response.data.wind.speed);
  dateTime.innerHTML = formatDate(response.data.time * 1000);
  weatherDescription.innerHTML = response.data.condition.description;
  icon.setAttribute("src", `${response.data.condition.icon_url}`);
  icon.setAttribute("alt", response.data.condition.description);
  //console.log(response.data);

  getForecast(response.data.coordinates);
}
function getCityWeather() {
  let searchInput = document.querySelector("#search-input");
  if (searchInput.value !== "") {
    h1.innerHTML = searchInput.value;
  } else {
    return;
  }
  let city = h1.innerHTML;
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then((response) => {
    showTemperature(response);
  });
}

const searchBtn = document.querySelector("#search-btn");
const kyiv = document.querySelector("#kyiv");
const lviv = document.querySelector("#lviv");
const odessa = document.querySelector("#odessa");

let h1 = document.querySelector("h1");
let units = "metric";
let searchForm = document.querySelector("#search-form");
let city = h1.innerHTML;
let apiKey = `be31ee9ff95t7734bo02a1e16b490b16`;
let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

//Celsius to fahrenheit
let linkCelsius = document.querySelector("#celsius");
let linkFahrenheit = document.querySelector("#fahrenheit");
let curDegrees = document.querySelector("#current-degrees");

displayForecast();

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

axios.get(url).then(showTemperature);

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getCityWeather();
});
searchBtn.addEventListener("click", () => getCityWeather());
kyiv.addEventListener("click", () => {
  city = kyiv.innerHTML;
  h1.innerHTML = city;
  url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(url).then(showTemperature);
});
lviv.addEventListener("click", () => {
  city = lviv.innerHTML;
  h1.innerHTML = city;
  url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(url).then(showTemperature);
});
odessa.addEventListener("click", () => {
  city = odessa.innerHTML;
  h1.innerHTML = city;
  url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(url).then(showTemperature);
});
