import React from "react";

export default function DetectionInfoDetail() {
  return (
    <>
      <div className="border-[var(--stroke-color)] bg-[var(--white-bg)] rounded-[10px] shadow-md m-[5px] w-min-full h-[100px] pt-2 px-1.5 pb-3">
        <div className="border rounded-[10px] py-1 px-2 bg-[var(--black-color)]">
          <h1 className="text-[18px] font-semibold text-[#FFF200]">
            PERSONAL <span className="text-[var(--white-bg)]">DETECTED</span>
          </h1>
        </div>
        <div className="flex items-center gap-0">
          <button className="bg-[var(--red-color)] rounded-[10px] p-2 flex items-center justify-center">
            <span className="relative top-[1px] text-[var(--white-bg)]">
              HIGH
            </span>
          </button>
          <div className="p-1 ml-[5px]">
            <p>좌표: 33.2456, 127.8365</p>
            <p>25.08.24 14시 28분 49초</p>
          </div>
        </div>
      </div>
      <div className="border-[var(--stroke-color)] bg-[var(--white-bg)] rounded-[10px] shadow-md m-[5px] w-min-full h-[100px] pt-2 px-1.5 pb-3">
        <div className="border rounded-[10px] py-1 px-2 bg-[var(--black-color)]">
          <h1 className="text-[18px] font-semibold text-[#FFF200]">
            PERSONAL <span className="text-[var(--white-bg)]">DETECTED</span>
          </h1>
        </div>
        <div className="flex items-center gap-0">
          <button className="bg-[var(--orange-color)] rounded-[10px] p-2 flex items-center justify-center">
            <span className="relative top-[1px] text-[var(--white-bg)]">
              MEDI
            </span>
          </button>
          <div className="p-1 ml-[5px]">
            <p>좌표: 33.2456, 127.8365</p>
            <p>25.08.24 14시 28분 49초</p>
          </div>
        </div>
      </div>
      <div className="border-[var(--stroke-color)] bg-[var(--white-bg)] rounded-[10px] shadow-md m-[5px] w-min-full h-[100px] pt-2 px-1.5 pb-3">
        <div className="border rounded-[10px] py-1 px-2 bg-[var(--black-color)]">
          <h1 className="text-[18px] font-semibold text-[var(--red-color)]">
            TANK <span className="text-[var(--white-bg)]">DETECTED</span>
          </h1>
        </div>
        <div className="flex items-center gap-0">
          <button className="bg-[var(--blue-color)] rounded-[10px] p-2 flex items-center justify-center">
            <span className="relative top-[1px] text-[var(--white-bg)]">
              LOW
            </span>
          </button>
          <div className="p-1 ml-[5px]">
            <p>좌표: 33.2456, 127.8365</p>
            <p>25.08.24 14시 28분 49초</p>
          </div>
        </div>
      </div>
    </>
  );
}
