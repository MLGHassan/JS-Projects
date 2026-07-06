
const api_key;

function getLocation(){
    if (!navigator.geolocation){
        console.error("geolocation not available")
        return;
    }
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };
  navigator.geolocation.getCurrentPosition(successCallback, error => (console.error(error)), options);
}

function successCallback(position) {
    const latitude = position.coords.latitude.toFixed(4);;
    const longitude = position.coords.longitude.toFixed(4);;
  

    locUpdate(`${latitude},${longitude}`);
//   fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${api_key}`)
//     .then(response => console.log(response.json()))
//     .catch(error => console.error(error));
//   console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
}

// Element references

const locationText = document.createElement('h2');
const tempText = document.createElement('h2');
const today = document.createElement('h2');
const desText = document.createElement('h2');

const windText = document.getElementById('wind-con');
const rainText = document.getElementById('rain-con');

const textBox = document.getElementById('text-box');
const sbmtButton = document.getElementById('submit-button');

const weatherIcn = document.getElementsByClassName('weather-icn')[0];

// Default location weather conditions fetch


// locUpdate();

// Function to update weather conditions on location input

sbmtButton.addEventListener('click', locUpdate);


function locUpdate(location) {
    console.log(textBox.value);
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${(textBox.value) ? textBox.value : location}?key=${api_key}`)
    .then(response => {
        if (!response.ok) {
        throw new Error("error boooo");
        }
        return response.json();
    })
    .then (data => {
        console.log(data);
        locationText.innerHTML = data.resolvedAddress;
        tempText.innerHTML = data.currentConditions.temp + " F";
        iconUpdate(data.currentConditions.icon);
        periodUpdate(data.days[0].hours);
        desText.innerHTML = data.description;
        windText.innerHTML = `Wind ${data.currentConditions.windspeed} m/s`;
        rainText.innerHTML = `Rain ${data.currentConditions.precipprob} %`;

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

    dayInfo.innerHTML = '';

    hoursarray.forEach(hour => {
        let currElem = document.createElement('div');
        currElem.className = "hourCard";
        let timeT = document.createElement('h2');
        let tempT = document.createElement('h2');
        timeT.innerHTML = convertHours(hour.datetime.slice(0, 2));
        tempT.innerHTML = hour.temp + " F";
        currElem.append(timeT);
        currElem.append(tempT);
        dayInfo.append(currElem);
    });
}

getLocation();

// Date and Month text formatting

const now = new Date();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


today.innerHTML = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`; // Setting text


const dateElem = document.getElementsByClassName('date-time')[0];
const locationElem = document.getElementsByClassName('location')[0];
const weatherCon2 = document.getElementsByClassName('weather-con2')[0];
const weatherCon3 = document.getElementsByClassName('weather-con3')[0];
const dayInfo = document.getElementById('dayInfo');

dateElem.append(today);
locationElem.append(locationText);
weatherCon2.append(tempText);
weatherCon2.append(desText);
