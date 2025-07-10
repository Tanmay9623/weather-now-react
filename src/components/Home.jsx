import React, { useEffect } from "react";
 import { Link } from "react-router-dom";

import weatherIcon from '../assets/sun.png';

export default function Home() {
  useEffect(() => {
    // paste your main.js code here (wrap in useEffect)
  }, []);

  return (
    <div id="screen">
      <div className="city-name">
        <i className="fa-solid fa-map-pin"></i>
        <h1 id="city-name">Mumbai</h1>
      </div>
      <div className="weather-icon-css">
        <img className="weather-icon" src={weatherIcon}alt="Weather Icon" />
      </div>
      <div className="weather-description">
        <div className="show-metric" id="metric">0°</div>
        <div className="weather-details">
          <div className="weather-main" id="weather-main">Sunny</div>
          <div className="h-f">
            <div className="show-humidity">H: <span id="humidity">60</span></div>
            ||
            <div className="show-humidity">F: <span id="feels-like">60</span></div>
          </div>
        </div>
      </div>
      <div className="forcasts-box">
        <div className="today-forecast">
          <h4>TODAY</h4>
          <div className="weather-icon-today">
            <img className="weather-icons" src={weatherIcon} alt="" />
          </div>
          <div className="temp-today">
            <span id="temp-min-today">50°</span><span>/ </span><span id="temp-max-today">55°</span>
          </div>
          <div className="weather-main-today" id="weather-main">Sunny</div>
        </div>
        <div className="future-forecast">
          <h5>6-DAYS FORECAST</h5>
          <div id="future-forecast-box"></div>
        </div>
      </div>
      <nav>
  <ul>
    <li>
      <Link to="/" className="active">
        <i className="fa-solid fa-location-arrow"></i>
      </Link>
    </li>
    <li>
      <Link to="/search">
        <i className="fa-solid fa-magnifying-glass"></i>
      </Link>
    </li>
    <li>
      <Link to="/world">
        <i className="fa-solid fa-earth-americas"></i>
      </Link>
    </li>
  </ul>
</nav>

    </div>
  );
}
