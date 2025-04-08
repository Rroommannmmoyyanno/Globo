import React from "react";
import { WiCloudy, WiDaySunny } from "react-icons/wi";
import "./WeatherCard.css";

function getWeatherIcon(description) {
  const desc = description.toLowerCase();
  if (desc.includes("nublado")) return <WiCloudy size={48} color="#nhbhb55" />;
  if (desc.includes("soleado")) return <WiDaySunny size={48} color="#f39c12" />;
  return <WiDaySunny size={48} color="#999" />; // Ícono por defecto
}

function WeatherCard({ city, temperature, description }) {
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      {getWeatherIcon(description)}
      <p>Temperatura: {temperature}°C</p>
      <p>Descripción: {description}</p>
    </div>
  );
}

export default WeatherCard;
5;
