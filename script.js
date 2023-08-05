const weatherBG = document.querySelector('.weather-img')
const weatherDetails = document.querySelectorAll('.full-details')
const errorMsg = document.querySelector('.error')
// const errormessage = document.getElementById('error')
const cityName = document.querySelector('.city-name')
const cityTemp = document.querySelector('.city-temp')
const climateName = document.querySelector('.climate-name')
const cityTempFeel = document.querySelector('.temp_feel')
// const cityMaxTemp = document.querySelector('.city-maxtemp')
const cityWindSpeed = document.querySelector('.wind')
const cityHumidity = document.querySelector('.humidity')
const cityClimate = document.querySelector('.climate-emoj')
var climate_bg = {
    'light rain': '/images/rain.jpeg',
    'moderate rain':'/images/moderate.jpeg',
    'heavy rain':'/images/heavy.jpeg',
    'overcast clouds':'/images/overcast.jpeg',
    'broken clouds': '/images/broken.jpeg',
    'few clouds':'/images/sunny.jpeg',
    'clear sky':'/images/clear.jpeg',
    'scattered clouds':'/images/broken.jpeg',
    'mist':'/images/mist.jpeg',
    'temperate clouds': '/images/broken.jpeg',
    'haze': '/images/mist.jpeg'
}
var climateIcon = {
    'light rain':'🌧️',
    'moderate rain':'🌧️',
    'heavy rain':'⛈️',
    'overcast clouds':'☁️',
    'broken clouds': '⛅',
    'few clouds':'🌤️',
    'clear sky':'☀️',
    'scattered clouds':'☁️',
    'mist':'🌫️',
    'temperate clouds': '☁️',
    'haze':'🌫️'
}

const weather = async () => {
    try {
        let city = document.getElementById('city').value
        const url = `https://openweathermap.org/data/2.5/find?q=${city}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`;
        const response = await fetch(url);
        const result = await response.json();
        
        const tempobj = {temp: 0, feels_like: 0}
        for(const key in tempobj){
            const tempvalue = result.list[0].main[key]
            const tempcon = (temp) =>  Math.trunc(temp - 273.15)
            tempobj[key]=tempcon(tempvalue)
        }
        cityName.textContent = `${result.list[0].name}`
        cityTemp.textContent = `feels like ${tempobj.feels_like}°C`
        cityTempFeel.textContent = `🌡️ ${tempobj.temp}°C`
        const weather_desc = result.list[0].weather[0].description
        cityClimate.textContent = climateIcon[weather_desc]
        climateName.textContent = weather_desc
        weatherBG.style.background = `url(${climate_bg[weather_desc]}) no-repeat center` 
        weatherBG.style.backgroundSize = 'cover'           
        cityWindSpeed.textContent = `🍃 ${result.list[0].wind['speed']}km/hr`
        cityHumidity.textContent = `💧 ${result.list[0].main['humidity']}g/m³`
        if(!errorMsg.classList.contains("hidden")){
            errorMsg.classList.add('hidden')
        }
        weatherDetails.forEach(El=>El.classList.remove('hidden'))
        
        console.log('Success👍')
    } 
    catch (error) {
        // console.log(error)
        weatherBG.style.background = ``;
        if(!weatherDetails.forEach(El=>El.classList.contains("hidden"))){
            weatherDetails.forEach(El=>El.classList.add('hidden'))
        }
        // weatherDetails.classList.toggle('hidden')
        errorMsg.classList.remove('hidden')
        console.error('Error Occured!')
    }
}

// console.log(Array)
document.querySelector(".search-btn").addEventListener('click',weather)

