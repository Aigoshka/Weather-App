//Date and time
let now = new Date();
function formatDate(date) {
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
    "December"
  ];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  let currentMinute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  let formattedDate = `${currentMonth} ${currentDate}, ${currentHour}:${currentMinute}`;
  return formattedDate;
}
let datesHours = document.querySelector("#dates-hours");
datesHours.innerHTML = formatDate(now);

//Search form

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${searchInput.value}`;
  showCity(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
//
function showCity(city) {
  let apiKey = "f36e45e370221a0b671266843fbab2eb";
  let apiWeatherAppUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiWeatherAppUrl).then(actualTemperature);
}
//temperature
function actualTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#huminidity-prc").innerHTML =
    response.data.main.humidity;
  document.querySelector("#actual-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}
//F/C
function showTemperatureC(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#actual-temp");
  celsiusTemperature.innerHTML = `${temperature}`;
}
let temperatureC = document.querySelector("#celsius");
temperatureC.addEventListener("click", showTemperatureC);

function showTemperatureF(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelector("#actual-temp");
  let celsiusTemperature = `${temperature}`;
  fahrenheitTemperature.innerHTML = Math.round(celsiusTemperature * 1.8 + 32);
}
let temperatureF = document.querySelector("#fahrenheit");
temperatureF.addEventListener("click", showTemperatureF);
// GeoLocation

function showPosition(position) {
  let apiKey = "f36e45e370221a0b671266843fbab2eb";
  let apiGeoLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiGeoLocation).then(actualTemperature);
}
function geoPlace(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let geoButton = document.querySelector("#geo-loc");
geoButton.addEventListener("click", geoPlace);

showCity("Prague");
