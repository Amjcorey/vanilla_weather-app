function displayTemperature(response){
    console.log(response.data);
}


let apiKey= "70de72ce25d0801c193edd1d17ced422";
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid={apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);