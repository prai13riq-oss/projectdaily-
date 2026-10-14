function getWeatherInfo(code){

  if(code === 0){
    return {
      icon:"☀️",
      text:"Clear Sky"
    };
  }

  if([1,2].includes(code)){
    return {
      icon:"🌤️",
      text:"Partly Cloudy"
    };
  }

  if(code === 3){
    return {
      icon:"☁️",
      text:"Cloudy"
    };
  }

  if([45,48].includes(code)){
    return {
      icon:"🌫️",
      text:"Foggy"
    };
  }

  if([51,53,55,56,57].includes(code)){
    return {
      icon:"🌦️",
      text:"Drizzle"
    };
  }

  if([61,63,65,66,67,80,81,82].includes(code)){
    return {
      icon:"🌧️",
      text:"Rainy"
    };
  }

  if([95,96,99].includes(code)){
    return {
      icon:"⛈️",
      text:"Thunderstorm"
    };
  }

  return {
    icon:"☁️",
    text:"Cloudy"
  };

}



function updateRecommendations(temp,code){

  const outfitIcon =
    document.getElementById("outfitIcon");

  const outfitTitle =
    document.getElementById("outfitTitle");

  const outfitText =
    document.getElementById("outfitText");

  const bagItems =
    document.getElementById("bagItems");

  const dailyNote =
    document.getElementById("dailyNote");


  /* RAIN */

  if([51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(code)){

    outfitIcon.textContent="🌧️";

    outfitTitle.textContent=
      "Rainy Day Outfit";

    outfitText.textContent=
      "Choose comfortable clothes and shoes that are easy to walk in during wet weather.";

    bagItems.innerHTML=`

      <div class="border-2 border-black rounded-xl p-3 bg-blue-50">
        ☂️ Umbrella
      </div>

      <div class="border-2 border-black rounded-xl p-3 bg-pink-50">
        🧻 Tissues
      </div>

      <div class="border-2 border-black rounded-xl p-3 bg-yellow-50">
        🔋 Power Bank
      </div>

      <div class="border-2 border-black rounded-xl p-3 bg-green-50">
        💧 Water
      </div>

    `;

    dailyNote.textContent=
      "Rain is possible today, so bringing an umbrella can make your day easier.";

    return;
  }



  /* HOT */

  if(temp >= 30){

    outfitIcon.textContent="☀️";

    outfitTitle.textContent=
      "Warm Weather Outfit";

    outfitText.textContent=
      "Light and breathable clothes can help you stay comfortable in warm weather.";

    bagItems.innerHTML=`

      <div class="border-2 border-black rounded-xl p-3 bg-yellow-50">
        🧴 Sunscreen
      </div>

      <div class="border-2 border-black rounded-xl p-3 bg-blue-50">
        💧 Water Bottle
      </div>

      <div class="border-2 border-black rounded-xl p-3 bg-pink-50">
        🧻 Tissues
      </div>

      <div class="border-2 border-black rounded-xl p-3 bg-purple-50">
        🔋 Power Bank
      </div>

    `;

    dailyNote.textContent=
      "It may feel warm today. Stay hydrated and take breaks from the heat when needed.";

    return;
  }



  /* COOL */

  if(temp <= 23){

    outfitIcon.textContent="🧥";

    outfitTitle.textContent=
      "Cool Weather Outfit";

    outfitText.textContent=
      "A light cardigan or jacket may be useful if the weather feels cool.";

    bagItems.innerHTML=`

      <div class="border-2 border-black rounded-xl p-3 bg-pink-50">
        🧥 Cardigan
      </div>

      <div class="border-2 border-black rounded-xl p-3 bg-blue-50">
        💧 Water
      </div>

      <div class="border-2 border-black rounded-xl p-3 bg-yellow-50">
        🎧 Headphones
      </div>

      <div class="border-2 border-black rounded-xl p-3 bg-purple-50">
        🔋 Power Bank
      </div>

    `;

    dailyNote.textContent=
      "The weather may feel cooler today, so keeping a light layer nearby could be useful.";

    return;
  }



  /* NORMAL */

  outfitIcon.textContent="🌷";

  outfitTitle.textContent=
    "Easy Everyday Outfit";

  outfitText.textContent=
    "Today's temperature is fairly comfortable, so choose something practical for your plans.";

  bagItems.innerHTML=`

    <div class="border-2 border-black rounded-xl p-3 bg-blue-50">
      💧 Water
    </div>

    <div class="border-2 border-black rounded-xl p-3 bg-pink-50">
      🎧 Headphones
    </div>

    <div class="border-2 border-black rounded-xl p-3 bg-yellow-50">
      📓 Notebook
    </div>

    <div class="border-2 border-black rounded-xl p-3 bg-purple-50">
      🔋 Power Bank
    </div>

  `;

  dailyNote.textContent=
    "Weather looks fairly comfortable today. Check your plans before heading out.";

}



async function getWeather(latitude,longitude){

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;

  try{

    const response =
      await fetch(url);

    if(!response.ok){
      throw new Error("Weather request failed");
    }

    const data =
      await response.json();

    const current =
      data.current;

    const temp =
      Math.round(current.temperature_2m);

    const feels =
      Math.round(current.apparent_temperature);

    const humidity =
      current.relative_humidity_2m;

    const wind =
      Math.round(current.wind_speed_10m);

    const code =
      current.weather_code;

    const weather =
      getWeatherInfo(code);


    document.getElementById("weatherIcon")
      .textContent=weather.icon;

    document.getElementById("weatherText")
      .textContent=weather.text;

    document.getElementById("temperature")
      .textContent=temp+"°C";

    document.getElementById("feelsLike")
      .textContent="Feels like "+feels+"°C";

    document.getElementById("humidity")
      .textContent=humidity+"%";

    document.getElementById("wind")
      .textContent=wind+" km/h";

    document.getElementById("locationText")
      .textContent="📍 Your Current Location";


    updateRecommendations(
      temp,
      code
    );

  }

  catch(error){

    console.error(error);

    document.getElementById("weatherText")
      .textContent="Can't load weather";

    document.getElementById("locationText")
      .textContent="Please try again.";

  }

}



function loadWeather(){

  document.getElementById("locationText")
    .textContent="Finding your location...";


  if(!navigator.geolocation){

    document.getElementById("weatherText")
      .textContent="Location is not supported.";

    return;

  }


  navigator.geolocation.getCurrentPosition(

    function(position){

      const latitude =
        position.coords.latitude;

      const longitude =
        position.coords.longitude;

      getWeather(
        latitude,
        longitude
      );

    },

    function(){

      document.getElementById("weatherText")
        .textContent="Location permission needed";

      document.getElementById("locationText")
        .textContent="📍 Please allow location access";

      document.getElementById("feelsLike")
        .textContent="Then press Refresh Weather.";

    }

  );

}



loadWeather();
