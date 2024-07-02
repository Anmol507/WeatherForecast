let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let wforecast = document.querySelector(".weather_forecast");
let wicon = document.querySelector(".weather_icon");
let wtemperature = document.querySelector(".weather_temperature");
let wminTemp = document.querySelector(".weather_min");
let wmaxTemp = document.querySelector(".weather_max");

let wfeelsLike = document.querySelector('.weather_feelsLike');
let whumidity = document.querySelector(".weather_humidity");
let wWind = document.querySelector(".weather_wind");
let wpressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

const getCountryName = (code) => {
    return new Intl.DisplayNames([code], {type:"region"}).of(code);
}

const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000); 
    console.log(curDate);

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    console.log(formatter);
    return formatter.format(curDate);
}

let city = 'delhi';
citySearch.addEventListener("submit", (e) => {
    e.preventDefault();       

    let cityName = document.querySelector(".city_name");
    console.log(cityName.value);
    city = cityName.value;

    getWeatherData();

    cityName.value = "";
})

const getWeatherData = async() =>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=95ec34a3971f5ccd4f3878e44fda636c`;
    try{
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data)

        const{main, name, weather, wind, sys, dt } = data;
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);

        wforecast.innerHTML = weather[0].main;
        wicon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

        wtemperature.innerHTML = `${(main.temp - 273.15).toFixed()}&#176`;    
        wminTemp.innerHTML = `Min: ${(main.temp_min - 273.15).toFixed()}&#176`; 
        wmaxTemp.innerHTML = `Max: ${(main.temp_max - 273.15).toFixed()}&#176`; 

        wfeelsLike.innerHTML = `${(main.feels_like - 273.15).toFixed(2)}&#176`;
        whumidity.innerHTML = `${main.humidity}%`;
        wWind.innerHTML = `${wind.speed} m/s`;
        wpressure.innerHTML = `${main.pressure} hPa`;
    }
    catch(error){
        console.log(error);
    }
}
document.body.addEventListener("load",getWeatherData());