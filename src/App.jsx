// src/App.jsx
import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import Globo from "./components/Globo";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [cityCoords, setCityCoords] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const apiKey = "78cc7eabaaa42866c68cf16e0ab0e1c1";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`
      );
      const data = await res.json();

      if (res.ok) {
        const esDeDia = data.dt > data.sys.sunrise && data.dt < data.sys.sunset;
        setWeather({
          ciudad: data.name,
          temperatura: data.main.temp,
          descripcion: data.weather[0].description,
          esDeDia,
        });
        setCityCoords({
          lat: data.coord.lat,
          lng: data.coord.lon,
        });
        setError("");
      } else {
        setError("Ciudad no encontrada");
        setWeather(null);
        setCityCoords(null);
      }
    } catch {
      setError("Hubo un error al buscar el clima");
      setWeather(null);
      setCityCoords(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const handleCountryClick = (nombre) => {
    console.log("País clickeado:", nombre);
    setCity(nombre); // ← esto llena el input con el nombre del país
    fetchWeather(); // ← busca el clima automáticamente
  };

  return (
    <div className={`app-container ${weather?.esDeDia ? "dia" : "noche"}`}>
      <h1>App del Clima</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Escribí una ciudad..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <WeatherCard
          city={weather.ciudad}
          temperature={weather.temperatura}
          description={weather.descripcion}
        />
      )}

      <div className="globo-container">
        <Globo cityCoords={cityCoords} onCountryClick={handleCountryClick} />
      </div>
    </div>
  );
}

export default App;
