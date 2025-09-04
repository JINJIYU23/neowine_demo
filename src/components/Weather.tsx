"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { WeatherData } from "@/types/weatherType";
import Time from "./Time";
import { FaLocationArrow } from "react-icons/fa";

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const getWeatherImage = (weatherId: number) => {
    if (weatherId >= 200 && weatherId <= 232) {
      return "/images/lightning.jpg"; // Thunderstorm
    } else if (weatherId >= 300 && weatherId <= 321) {
      return "/images/rain.jpg"; // Drizzle
    } else if (weatherId >= 500 && weatherId <= 531) {
      return "/images/rain.jpg"; // Rain
    } else if (weatherId >= 600 && weatherId <= 622) {
      return "/images/snow.jpg"; // Snow
    } else if (weatherId >= 701 && weatherId <= 781) {
      return "/images/dust.jpg"; // Atmosphere
    } else if (weatherId === 800) {
      return "/images/sunny.jpg"; // Clear
    } else if (weatherId >= 801 && weatherId <= 804) {
      return "/images/cloudy.jpg"; // Clouds
    } else {
      return "/images/sunny.jpg"; // 기본값
    }
  };

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
    <div className="ml-5 mb-[20px] rounded-[10px] h-[290px] relative overflow-hidden shadow-md">
      {weatherData ? (
        <Image
          src={getWeatherImage(weatherData.weather[0].id)}
          alt="날씨 배경"
          fill
          className="object-cover object-center"
          priority
        />
      ) : (
        <Image
          src="/asset/images/sunny.jpg"
          alt="기본 날씨 배경"
          fill
          className="object-cover object-center"
          priority
        />
      )}
      <div className="absolute inset-0 bg-white/65"></div>
      <div className="relative z-10 flex flex-col h-full">
        <Time />
        {weatherData && (
          <div className="flex items-center justify-center mt-[30px]">
            <FaLocationArrow className="text-[20px]" />
            <p className="text-[24px] ml-2 text-center mt-[5px]">
              {weatherData.name.toUpperCase()}
            </p>
          </div>
        )}

        {weatherData && (
          <div className="flex flex-row items-center justify-center">
            {/* 날씨 정보 */}
            <div className="flex flex-col items-center">
              <div className="flex flex-row items-baseline justify-center">
                <p className="text-[32px] font-semibold mr-[10px]">
                  {weatherData.main?.temp.toFixed(1)}°C
                </p>
                <p>{weatherData.weather[0].description}</p>
              </div>
              <div className="flex gap-4 mt-1">
                <p>최고: {weatherData.main?.temp_max.toFixed(1)}°C</p>
                <p>최저: {weatherData.main?.temp_min.toFixed(1)}°C</p>
              </div>
            </div>

            <div>
              <Image
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
                width={120}
                height={120}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
