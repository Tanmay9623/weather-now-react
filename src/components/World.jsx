import React, { useEffect } from "react";
import sun from "../assets/sun.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import cloud from "../assets/cloud.png";
import mist from "../assets/mist.png";
import haze from "../assets/haze.png";
import thunderstorm from "../assets/thunderstorm.png";

 
export default function World() {
  useEffect(() => {
    const apiKey = "1e3e8f230b6064d27976e41163a82b77";
    const searchinput = document.querySelector(".searchinput");
    const box = document.querySelector(".city-box");
    const normalMessage = document.querySelector(".normal-message");
    const errorMessage = document.querySelector(".error-message");
    const addedMessage = document.querySelector(".added-message");
    const dateEl = document.querySelector(".date");

    const months_name = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const now = new Date();
    dateEl.innerHTML = `${months_name[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    async function city(cityName) {
      const url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`
      );
      if (url.ok) {
        const data = await url.json();
        const weatherBox = document.createElement("div");
        weatherBox.className = "weather-box";

        const nameDiv = document.createElement("div");
        nameDiv.className = "name";

        const cityElement = document.createElement("div");
        cityElement.className = "city-name city";
        cityElement.innerHTML = data.name;

        const tempElement = document.createElement("div");
        tempElement.className = "weather-temp temp";
        tempElement.innerHTML = Math.floor(data.main.temp) + "°";

        const weatherIconDiv = document.createElement("div");
        weatherIconDiv.className = "weather-icon";
        const weatherImg = document.createElement("img");
        weatherImg.className = "weather";

       const iconMap = {
  rain: rain,
  clear: sun,
  snow: snow,
  clouds: cloud,
  smoke: cloud,
  mist: mist,
  fog: mist,
  haze: haze,
  thunderstorm: thunderstorm,
};

        const weatherType = data.weather[0].main.toLowerCase();
        weatherImg.src = `${iconMap[weatherType] || "sun.png"}`;

        weatherIconDiv.appendChild(weatherImg);
        nameDiv.appendChild(cityElement);
        nameDiv.appendChild(tempElement);
        weatherBox.appendChild(nameDiv);
        weatherBox.appendChild(weatherIconDiv);
        box.appendChild(weatherBox);

        return weatherBox;
      } else {
        return null;
      }
    }

    document.querySelector(".button").addEventListener("click", () => {
      const section = document.querySelector(".add-section");
      const navIcon = document.querySelector(".btn-icon");
      if (section.style.top === "-60rem") {
        section.style.top = "100px";
        navIcon.className = "fa-solid fa-circle-xmark";
      } else {
        section.style.top = "-60rem";
        navIcon.className = "fa-solid fa-circle-plus";
      }
    });

    searchinput.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        const weatherInfo = await city(searchinput.value);
        if (weatherInfo) {
          normalMessage.style.display = "none";
          errorMessage.style.display = "none";
          addedMessage.style.display = "block";
          box.prepend(weatherInfo);
        } else {
          normalMessage.style.display = "none";
          errorMessage.style.display = "block";
          addedMessage.style.display = "none";
        }
      }
    });

    // Initial cities
    city("London");
    city("Paris");
    city("New York");
    city("Mumbai");
    city("Tokyo");
  }, []);

  return (
    <div id="screen">
      <div className="section">
        <div className="date">April 7, 2024</div>
        <div className="button">
          <i className="fa-solid fa-circle-plus btn-icon"></i>
        </div>
      </div>
      <div className="section-box">
        <div className="add-section">
          <div className="add-section-title">
            <h2>Add a new place</h2>
          </div>
          <div className="search">
            <div className="search-icon">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <input className="searchinput" type="text" placeholder="search..." />
          </div>
          <div className="messages">
            <div className="error-message">City not found</div>
            <div className="normal-message">Search your city to add</div>
            <div className="added-message">Successfully added ✔</div>
          </div>
        </div>
      </div>
      <div className="city-box"></div>
      <nav>
        <ul>
          <li><a href="/"><i className="fa-solid fa-location-arrow"></i></a></li>
          <li><a href="/search"><i className="fa-solid fa-magnifying-glass"></i></a></li>
          <li><a className="active" href="/world"><i className="fa-solid fa-earth-americas"></i></a></li>
        </ul>
      </nav>
    </div>
  );
}
