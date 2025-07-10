import React, { useEffect } from "react";
import haze from "../assets/haze.png"
import sun from "../assets/sun.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import cloud from "../assets/cloud.png";
import mist from "../assets/mist.png";
 
import thunderstorm from "../assets/thunderstorm.png";

export default function Search() {
  useEffect(() => {
    const apiKey = "1e3e8f230b6064d27976e41163a82b77";
    const searchinput = document.querySelector(".searchinput");

    async function search(city) {
      try {
        const url = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
        );

        if (!url.ok) throw new Error("City not found");
        const data = await url.json();

        document.querySelector(".return").style.display = "block";
        document.querySelector(".message").style.display = "none";
        document.querySelector(".error-message").style.display = "none";

        const weatherImg = document.querySelector(".weather-img");
        document.querySelector(".city-name").innerHTML = data.name;
        document.querySelector(".weather-temp").innerHTML =
          Math.floor(data.main.temp) + "°";
        document.querySelector(".wind").innerHTML =
          Math.floor(data.wind.speed) + " m/s";
        document.querySelector(".pressure").innerHTML =
          Math.floor(data.main.pressure) + " hPa";
        document.querySelector(".humidity").innerHTML =
          Math.floor(data.main.humidity) + "%";
        document.querySelector(".sunrise").innerHTML = new Date(
          data.sys.sunrise * 1000
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        document.querySelector(".sunset").innerHTML = new Date(
          data.sys.sunset * 1000
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        const condition = data.weather[0].main.toLowerCase();
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
        weatherImg.src = `${iconMap[condition] || "sun.png"}`;
      } catch (error) {
        document.querySelector(".return").style.display = "none";
        document.querySelector(".message").style.display = "none";
        document.querySelector(".error-message").style.display = "block";
        console.error("Weather Error:", error);
      }
    }

    searchinput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        search(searchinput.value);
      }
    });
  }, []);

  return (
    <div id="screen">
      <h3>Search For City</h3>
      <div className="search">
        <div className="search-icon">
          <i className="fa-solid fa-location-dot"></i>
        </div>
        <input className="searchinput" type="text" placeholder="search..." />
      </div>
      <div className="message">
        <p>You have the option to search by city, state, or country names.</p>
      </div>
      <div className="error-message">
        <p>
          One of the specified locations (city, state, or country) was not
          found. Please try again
        </p>
      </div>
      <div className="return">
        <div className="box">
          <div className="weather-box">
            <div className="name">
              <div className="city-name">Landon</div>
              <div className="weather-temp">20°</div>
            </div>
            <div className="weather-icon">
              <img className="weather-img" src={haze} alt="" />
            </div>
          </div>
          <div className="weather-desc">
            <div className="desc-box">
              <div className="desc-icon">
                <i className="fa-solid fa-wind"></i>
              </div>
              <div className="desc-name">Wind</div>
              <div className="desc-info wind">15 m/s</div>
            </div>
            <div className="desc-box">
              <div className="desc-icon">
                <i className="fa-solid fa-temperature-full"></i>
              </div>
              <div className="desc-name">Pressure</div>
              <div className="desc-info pressure">15 mbar</div>
            </div>
            <div className="desc-box">
              <div className="desc-icon">
                <i className="fa-solid fa-droplet"></i>
              </div>
              <div className="desc-name">Humidity</div>
              <div className="desc-info humidity">50%</div>
            </div>
          </div>
          <div className="weather-desc">
            <div className="desc-box">
              <div className="desc-icon">
                <i className="fa-solid fa-sun"></i>
              </div>
              <div className="desc-name">Sun Rise</div>
              <div className="desc-info sunrise">12:00:00</div>
            </div>
            <div className="desc-box">
              <div className="desc-icon">
                <i className="fa-solid fa-cloud-sun"></i>
              </div>
              <div className="desc-name">Sun Set</div>
              <div className="desc-info sunset">12:00:00</div>
            </div>
          </div>
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/">
              <i className="fa-solid fa-location-arrow"></i>
            </a>
          </li>
          <li>
            <a className="active" href="/search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </a>
          </li>
          <li>
            <a href="/world">
              <i className="fa-solid fa-earth-americas"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
