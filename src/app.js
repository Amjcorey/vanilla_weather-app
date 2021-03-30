function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${minutes}`;
    }
    let minutes = date.getMinutes();
    if (minuets < 10) {
        minues = `0${minutes}`;
    }
    let days = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ];
    let day = date.getDay();
    return `${day} ${hours}:${minutes}`; 
}



function displayTemperature(response){


    console.log(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");

    temperatureElement.innerHTML = Math.round(response.displayTemperature.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.main.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
   

}

let apiKey= "70de72ce25d0801c193edd1d17ced422";
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid={apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);