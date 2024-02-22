// get various elements from html
const weatherElement = document.getElementById("weather"); 
const timeElement = document.getElementById("time");
const weatherButton = document.getElementById("weatherBtn");
const celcius = document.getElementById("celciusBtn");
const fahrenheit = document.getElementById("fahrentheitBtn");
const emoji = document.getElementById("emoji");

// weather location and API
const city = 'London';
const url = "https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current=temperature_2m,relative_humidity_2m,is_day,rain&forecast_days=1";

// main function to retrieve and display weather and time info
async function getAndDisplayWeather() {
  const weatherInfo = await retrieveWeather();
  displayWeather(weatherInfo);
  displayTime(weatherInfo);
  dayOrNight(weatherInfo);
}

// Function to retrieve weather info
async function retrieveWeather() {
  const response = await fetch(url,{
    headers:{
      Accept: "application/json"
    }
  });
  console.log(response);

  if(!response.ok){
    console.error(response.status);
    console.error(response.text());
  }
  const data = await response.json();
  console.log(data);
  return data;
  };

// Function to display weather
function displayWeather(data) {
  const currentTemp = data.current.temperature_2m;
  const unit = data.current_units.temperature_2m;
  weatherElement.textContent = `It is ${currentTemp} ${unit} in ${city} at the moment.`;
  return currentTemp;
}

//function to display time
function displayTime(data){
  const time = data.current.time;
  timeElement.textContent = time;
}

// Function to convert °C to °F (°C * 1.8) + 32 = °F
async function toFahrenheit() {
  const data = await retrieveWeather();
  const tempF = (displayWeather(data)* 1.8) + 32;
  const unit = "°F";
  weatherElement.textContent =  `It is ${tempF} ${unit} in ${city} at the moment.`;
};

// Function to display day or night 
function dayOrNight(data) {
  const isDay = data.current.is_day;
  if (isDay) {
    emoji.src = "cloud.png";
  } else {
    emoji.src = "night.png";
  }
}

// Event Listeners
// page load
document.addEventListener("DOMContentLoaded", getAndDisplayWeather);
// get weather and weather conversions 
weatherButton.addEventListener("click", getAndDisplayWeather);
celcius.addEventListener('click', getAndDisplayWeather);
fahrenheit.addEventListener('click', toFahrenheit);



// const reverseGeocode = async (lat, lng, apiKey) => {
//   try {
//     const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
//     const data = await response.json();
    
//     const address = data.results[0].formatted_address;
//     console.log(address);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const lat = 40.7128;
// const lng = -74.0060;
// const apiKey = 'YOUR_API_KEY';

// reverseGeocode(lat, lng, apiKey);
