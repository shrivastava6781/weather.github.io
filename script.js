const apiKey = 'e57125c284ba257dcdd82abfec01cbcb'; // Replace with your OpenWeatherMap API key

const getWeather = (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    cityName.innerHTML = city;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            
            // Update DOM elements with weather data
            temp.innerHTML = Math.round(data.main.temp);
            temp2.innerHTML = Math.round(data.main.temp);
            feels_like.innerHTML = Math.round(data.main.feels_like);
            humidity.innerHTML = data.main.humidity;
            humidity2.innerHTML = data.main.humidity;
            min_temp.innerHTML = Math.round(data.main.temp_min);
            max_temp.innerHTML = Math.round(data.main.temp_max);
            wind_speed.innerHTML = data.wind.speed;
            wind_speed2.innerHTML = data.wind.speed;
            wind_degrees.innerHTML = data.wind.deg;
            
            // Convert Unix timestamps to readable time
            const sunriseTime = new Date(data.sys.sunrise * 1000);
            const sunsetTime = new Date(data.sys.sunset * 1000);
            sunrise.innerHTML = sunriseTime.toLocaleTimeString();
            sunset.innerHTML = sunsetTime.toLocaleTimeString();
            
            // Update weather description and icon
            const weatherIcon = document.getElementById('weather-icon');
            weatherDescription.innerHTML = data.weather[0].description;
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        })
        .catch(err => {
            console.error('Error fetching weather:', err);
            // alert('Error fetching weather data. Please check the city name and try again.');
        });
}

// Event listener for form submission
document.getElementById('submit').addEventListener("click", (e) => {
    e.preventDefault();
    const cityInput = document.getElementById('city');
    getWeather(cityInput.value);
});

// Initial load with default city
getWeather("landon");


