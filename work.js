document.addEventListener('DOMContentLoaded',() =>{
    const cityInput = document.getElementById('city-input')
    const getWeatherBtn = document.getElementById('get-weather-btn')
    const weatherInfo = document.getElementById('weather-info')
    const cityNameDisplay = document.getElementById('city-name')
    const temperatureDisplay = document.getElementById('temperature')
    const descriptionDisplay = document.getElementById('description')
    const errorMessage = document.getElementById('error-message')
    const API_KEY = "12294b6781927d67e6db1d3abe8a4e3c"; //env variables


    getWeatherBtn.addEventListener('click',async () =>{
        const city = cityInput.value.trim()
        if(!city) return;

        //it may throw error
        try {
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData);

        } catch (error) {
            showError()
        }

         
    })
    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        console.log(response)

        if(!response.ok){
            throw new Error("city not found");
        }
        const data = await response.json()
        console.log("in json format",data);
        return data;

    }
    function displayWeatherData(data){
        // console.log("displayWeatherData",data);
        const {name, main, weather} = data;
        cityNameDisplay.textContent = name;

        //unlock hidden
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden')
        temperatureDisplay.textContent = `Temperature : ${main.temp} °C`
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`


    }
    function showError(){
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
})