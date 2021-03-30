function displayTemperature(response){


    console.log(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");

    temperatureElement.innerHTML = Math.round(response.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.main.wind.speed);

}


let apiKey= "70de72ce25d0801c193edd1d17ced422";
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid={apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);