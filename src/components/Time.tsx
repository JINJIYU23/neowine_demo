"use client";
import { useEffect, useState } from "react";

export default function Time() {
  const [time, setTime] = useState("");
  const [today, setToday] = useState("");
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const todayDate = new Date();
    // const year = todayDate.getFullYear();
    const month = String(todayDate.getMonth() + 1).padStart(2, "0");
    const day = String(todayDate.getDate()).padStart(2, "0");
    setToday(`${month}월 ${day}일`);

    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        setTime(`${hours}:${minutes}:${seconds}`);
        setFade(true);
      }, 150);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full pt-[10px] text-center text-[var(--black-color)]">
        <div
          className={`text-[24px] pl-[20px] font-mono transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {time}
        </div>
        <div className="text-[18px] pr-[20px] font-mono">{today}</div>
      </div>
    </>
  );
}
