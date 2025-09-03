import React from "react";

export default function LLMTextHistoryDetail() {
  return (
    <>
      <div className="border-[var(--stroke-color)] text-[var(--black-color)] rounded-[10px] bg-[var(--white-bg)] flex items-center justify-between shadow-md m-[5px] w-min-full h-[60px] p-3">
        <div className="flex flex-col font-semibold">
          <p>전파 탐지</p>
          <span className="text-[var(--orange-color)]">중위험</span>
        </div>
        <div className="flex flex-row text-[14px]">
          <p>14시 28분 49초</p>
        </div>
      </div>

      <div className="border-[var(--stroke-color)] text-[var(--black-color)] rounded-[10px] bg-[var(--white-bg)] flex items-center justify-between shadow-md m-[5px] w-min-full h-[60px] p-3">
        <div className="flex flex-col font-semibold">
          <p>새로운 위험 탐지</p>
          <span className="text-[var(--blue-color)]">저위험</span>
        </div>
        <div className="flex flex-row text-[14px]">
          <p>14시 28분 49초</p>
        </div>
      </div>

      <div className="border-[var(--stroke-color)] text-[var(--black-color)] rounded-[10px] bg-[var(--white-bg)] flex items-center justify-between shadow-md m-[5px] w-min-full h-[60px] p-3">
        <div className="flex flex-col font-semibold">
          <p>새로운 위험 탐지</p>
          <span className="text-[var(--red-color)]">고위험</span>
        </div>
        <div className="flex flex-row text-[14px]">
          <p>14시 28분 49초</p>
        </div>
      </div>
    </>
  );
}
