// =====================================================
// THE VANTAGE - DATE, WEATHER & AIR QUALITY
// =====================================================


// =====================================================
// GET HTML ELEMENTS
// =====================================================

const currentDate = document.getElementById("current-date");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const weatherDescription = document.getElementById("weather-description");
const airQuality = document.getElementById("air-quality");


// =====================================================
// CURRENT DATE
// =====================================================

function updateDate() {

    const now = new Date();

    const date = new Intl.DateTimeFormat("en-US", {

        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",

        timeZone: "Asia/Kathmandu"

    }).format(now);


    currentDate.textContent = date;
}


// =====================================================
// WEATHER DESCRIPTION
// =====================================================

function getWeatherInfo(code) {

    if (code === 0) {
        return {
            description: "Clear sky",
            icon: "☀️"
        };
    }

    if (code === 1 || code === 2) {
        return {
            description: "Partly cloudy",
            icon: "🌤️"
        };
    }

    if (code === 3) {
        return {
            description: "Overcast",
            icon: "☁️"
        };
    }

    if (code === 45 || code === 48) {
        return {
            description: "Foggy",
            icon: "🌫️"
        };
    }

    if (
        code === 51 ||
        code === 53 ||
        code === 55 ||
        code === 56 ||
        code === 57
    ) {
        return {
            description: "Drizzle",
            icon: "🌦️"
        };
    }

    if (
        code === 61 ||
        code === 63 ||
        code === 65 ||
        code === 66 ||
        code === 67 ||
        code === 80 ||
        code === 81 ||
        code === 82
    ) {
        return {
            description: "Rain",
            icon: "🌧️"
        };
    }

    if (
        code === 71 ||
        code === 73 ||
        code === 75 ||
        code === 77 ||
        code === 85 ||
        code === 86
    ) {
        return {
            description: "Snow",
            icon: "❄️"
        };
    }

    if (
        code === 95 ||
        code === 96 ||
        code === 99
    ) {
        return {
            description: "Thunderstorm",
            icon: "⛈️"
        };
    }


    return {
        description: "Current conditions",
        icon: "🌡️"
    };
}


// =====================================================
// GET CURRENT WEATHER
// =====================================================

async function updateWeather() {

    try {

        // Kathmandu coordinates
        const latitude = 27.7172;
        const longitude = 85.3240;


        const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${latitude}` +
            `&longitude=${longitude}` +
            `&current=temperature_2m,weather_code` +
            `&timezone=Asia%2FKathmandu`;


        const response = await fetch(url);


        if (!response.ok) {
            throw new Error("Weather API error");
        }


        const data = await response.json();


        const current = data.current;


        // Temperature
        temperature.textContent =
            Math.round(current.temperature_2m) + "°C";


        // City
        city.textContent = "Kathmandu";


        // Weather information
        const weatherInfo =
            getWeatherInfo(current.weather_code);


        weatherIcon.textContent =
            weatherInfo.icon;


        weatherDescription.textContent =
            weatherInfo.description;


    } catch (error) {

        console.error("Weather error:", error);

        temperature.textContent = "--°C";

        weatherIcon.textContent = "🌤️";

        weatherDescription.textContent =
            "Weather unavailable";

    }

}


// =====================================================
// AIR QUALITY
// =====================================================

async function updateAirQuality() {

    try {

        const latitude = 27.7172;
        const longitude = 85.3240;


        const url =
            `https://air-quality-api.open-meteo.com/v1/air-quality` +
            `?latitude=${latitude}` +
            `&longitude=${longitude}` +
            `&current=us_aqi` +
            `&timezone=Asia%2FKathmandu`;


        const response = await fetch(url);


        if (!response.ok) {
            throw new Error("Air quality API error");
        }


        const data = await response.json();


        const aqi =
            data.current.us_aqi;


        if (aqi !== null && aqi !== undefined) {

            airQuality.textContent =
                Math.round(aqi);

        } else {

            airQuality.textContent =
                "Unavailable";

        }


    } catch (error) {

        console.error("Air quality error:", error);

        airQuality.textContent =
            "Unavailable";

    }

}


// =====================================================
// START
// =====================================================

updateDate();

updateWeather();

updateAirQuality();


// =====================================================
// AUTOMATIC REFRESH
// =====================================================

// Update date every minute
setInterval(updateDate, 60 * 1000);


// Update weather every 15 minutes
setInterval(updateWeather, 15 * 60 * 1000);


// Update air quality every 15 minutes
setInterval(updateAirQuality, 15 * 60 * 1000);