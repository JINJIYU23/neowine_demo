"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { WeatherData } from "@/types/weatherType";
import Time from "./Time";
import { FaLocationArrow } from "react-icons/fa";

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const fetchWeather = async () => {
    const cache = localStorage.getItem("weather");
    const cacheTime = localStorage.getItem("weatherTime");

    if (cache && cacheTime) {
      const now = Date.now();
      if (now - Number(cacheTime) < 1800000) {
        setWeatherData(JSON.parse(cache));
        return;
      }
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=37.5665&lon=126.9780&appid=${API_KEY}&units=metric&lang=kr`
      );

      if (!res.ok) throw new Error(`API Error ${res.status}`);

      const data = await res.json();
      setWeatherData(data);

      localStorage.setItem("weather", JSON.stringify(data));
      localStorage.setItem("weatherTime", Date.now().toString());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();

    const interval = setInterval(() => {
      fetchWeather();
    }, (60 * 60 * 1000) / 2);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ml-5 mb-[20px] rounded-[10px] bg-[var(--box-color)] h-[290px]">
      <div className="flex flex-col mt-[30px] items-center justify-center">
        <Time />
        {weatherData && (
          <div className="text-center p-2">
            <p className="text-[24px]">{weatherData.name.toUpperCase()}</p>
            <FaLocationArrow />
            <p className="text-[32px] font-semibold">
              {weatherData.main?.temp.toFixed(1)}°C
            </p>
            <div className="flex flex-row items-center justify-center">
              <p>{weatherData.weather[0].description}</p>
              <Image
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
                width={64}
                height={64}
              />
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
              <p>최고: {weatherData.main?.temp_max.toFixed(1)}°C</p>
              <p>최저: {weatherData.main?.temp_min.toFixed(1)}°C</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
