const api_key = "YOUR_API_KEY";

// Capture your fixed text positions out of the DOM safely
const locationText = document.getElementById('location-text');
const tempText = document.getElementById('temp-text');
const desText = document.getElementById('description-text');
const todayText = document.getElementById('today-text');

const windText = document.getElementById('wind-con');
const rainText = document.getElementById('rain-con');
const textBox = document.getElementById('text-box');
const sbmtButton = document.getElementById('submit-button');
const weatherIcn = document.querySelector('.weather-icn');
const dayInfo = document.getElementById('dayInfo');

function getLocation() {
    if (!navigator.geolocation) {
        console.error("geolocation not available");
        return;
    }
    const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };
    navigator.geolocation.getCurrentPosition(successCallback, error => console.error(error), options);
}

function successCallback(position) {
    const latitude = position.coords.latitude.toFixed(4);
    const longitude = position.coords.longitude.toFixed(4);
    locUpdate(`${latitude},${longitude}`);
}

sbmtButton.addEventListener('click', () => locUpdate());

function locUpdate(location) {
    const queryValue = textBox.value.trim() ? textBox.value.trim() : location;
    if (!queryValue) return;

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${queryValue}?key=${api_key}`)
    .then(response => {
        if (!response.ok) throw new Error("Weather fetch failed.");
        return response.json();
    })
    .then(data => {
        locationText.textContent = data.resolvedAddress;
        tempText.textContent = `${data.currentConditions.temp}°F`;
        desText.textContent = data.description;
        windText.textContent = `Wind ${data.currentConditions.windspeed} m/s`;
        rainText.textContent = `Rain ${data.currentConditions.precipprob}%`;
        
        iconUpdate(data.currentConditions.icon);
        periodUpdate(data.days[0].hours);
    })
    .catch(error => console.error(error));
}

function iconUpdate(cond) {
    weatherIcn.src = `${cond}.svg`;
    weatherIcn.style.display = 'block';
}

const convertHours = (hours) => {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; 
    return `${hours12} ${ampm}`;
};

function periodUpdate(hoursarray) {
    dayInfo.innerHTML = ''; // Wipe old elements out before redraw
    
    hoursarray.forEach(hour => {
        const currElem = document.createElement('div');
        currElem.className = "hourCard";
        
        const timeT = document.createElement('h3');
        timeT.textContent = convertHours(parseInt(hour.datetime.slice(0, 2)));
        
        const tempT = document.createElement('span');
        tempT.textContent = `${hour.temp}°F`;
        
        currElem.append(timeT, tempT);
        dayInfo.append(currElem);
    });
}

// Format Date immediately on execution
const now = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

todayText.textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;

// Boot up geolocation search automatically
getLocation();