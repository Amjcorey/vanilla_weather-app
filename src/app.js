//Date and Time
function formatDate(timestamp) {
    let date = new Date(timestamp);

    let days = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ];
    let day = days[date.getDay()];
    return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    return `${hours}:${minutes}`;
    
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    return days[day];
  }
  
//Forecast


function displayForecast(response) {
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

 // forecastElement.innerHTML = null;
 // let forecast = null;

 // for (let index = 0; index < 6; index++)
  
  let days = ["Thru", "Fri", "Sat"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (forecastDay, index) {
   if (index < 6 ) {
    forecastHTML += 
       // forecastHTML + 
        `
            <div class="col-2">
                <div class="weather-forcast-date">${formatDay(forecastDay.dt)}</div>
                    <img 
                    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
                    alt=""
                    width="36px"
                    />
                    <div class="forecast-temperature">
                    <span class="weather-forecast-temperature-max">
                    ${Math.round(forecastDay.temp.max)}°
                    </span>
                    <span class="weather-forecast-temperature-min">
                      ${Math.round(forecastDay.temp.min)}°
                    </span>
                  </div>
            </div>
        `;
   }
      });
 
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML; 

}

function getForecast(coordinates) {
  let apiKey = "70de72ce25d0801c193edd1d17ced422";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
 // console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}


//Temperature, humidity, wind, and icon
function displayTemperature(response) {
    console.log(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    
    
    celsiusTemperature = response.data.main.temp;


    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      iconElement.setAttribute("alt", response.data.weather[0].description)
    

    getForecast(response.data.coord);
    
}

 

//Search City Location & Axios data
function search(city) {
 let apiKey = "70de72ce25d0801c193edd1d17ced422";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(displayTemperature);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

//Current Location
 function searchCurrentLocation(position) {
   console.log(position);
 let lat = position.coords.latitude;
 let lon = position.coords.longitude;
 let apiKey = "70de72ce25d0801c193edd1d17ced422";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
 axios.get(apiUrl).then(searchCurrentLocation);
}

//Current location button
 let currentButton = document.querySelector("#show-position");
 currentButton.addEventListener("click", searchCurrentLocation);


function handleSubmit(event)  {
  event.preventDefault();
  let inputCityElement = document.querySelector("#input-city");
  search(inputCityElement.value);
}

//Fahrenheit and celsius
function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
} 
 
function displayCelsius(event) { 
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;




// Handle Submit Search
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//Current Location Button Event
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", searchCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

search("Seattle");
displayForecast();
 