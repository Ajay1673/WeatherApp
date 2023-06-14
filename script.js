const searchBtn = document.getElementById('search-btn')
const weatherClass = document.querySelector('.weather-details')
const errormessage = document.getElementById('error')

searchBtn.onclick = () => {
    let city = document.getElementById('city').value
    weatherClass.style.display = "flex"
    document.getElementById('userDesc').style.display = "none"
    /*  const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '555dd5dd64msh44dddc30426f698p1ae576jsn56d3eeaa2b54',
            'X-RapidAPI-Host': 'forecast9.p.rapidapi.com'
        }
    }; */
    const weather = async () => {
        const url = `https://openweathermap.org/data/2.5/find?q=${city}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`;
        const cityName = document.getElementById('city-name')
        const cityTemp = document.getElementById('city-temp')
        const cityMinTemp = document.getElementById('city-mintemp')
        const cityMaxTemp = document.getElementById('city-maxtemp')
        const cityWindSpeed = document.getElementById('city-windspeed')
        const cityHumidity = document.getElementById('city-humidity')
        const cityClimate = document.getElementById('city-climate')
        const climateIcon = {
            'light rain':'🌧️',
            'moderate rain':'🌧️',
            'heavy rain':'⛈️',
            'overcast clouds':'🌥️',
            'broken clouds': '⛅',
            'few clouds':'🌤️',
            'clear sky':'☀️',
            'scattered clouds':'☁️',
            'mist':'🌫️'
        }
        try {
            const response = await fetch(url);
            const result = await response.json();
            cityName.innerText = result.list[0].name;
            const tempobj = {temp: 0, temp_min: 0, temp_max: 0}
            for(const key in tempobj){
                const tempvalue = result.list[0].main[key]
                const tempcon = (temp) =>  Math.ceil(temp - 273.15)
                tempobj[key]=tempcon(tempvalue)
            }
            cityTemp.innerText = `Temperature : ${tempobj['temp']}°C`
            cityMinTemp.innerText = `Min-Temperature : ${tempobj['temp_min']}°C`
            cityMaxTemp.innerText = `Max-Temperature : ${tempobj['temp_max']}°C`
            cityWindSpeed.innerText = `WindSpeed : ${result.list[0].wind['speed']}m/s`
            cityHumidity.innerText = `Humidity : ${result.list[0].main['humidity']}%`
            const climatedesc = result.list[0].weather[0].description
            cityClimate.innerText = `Climate : ${climateIcon[climatedesc]} ${climatedesc}`
            console.log('success👍')
            errormessage.style.display = 'none'
        } 
        catch (error) {
            errormessage.style.display = 'block'
            weatherClass.style.display = 'none'
            weatherClass.style.border = "none"
            errormessage.innerText =  '⚠️City Not Available'
            console.error('process failed due to wrong name❌');
        }
    }
    weather()
}

