import React from "react";

export default function ExpectedRoute() {
  return (
    <div className="rounded-[10px] bg-[#FF7F11]/20 h-min-full shadow-md p-2">
      <h1 className="font-semibold p-1 text-[20px] text-[var(--orange-color)]">
        예상 경로
      </h1>
      <hr className="border-[var(--orange-color)]" />
      <div className="py-[10px]">
        <p className="text-[var(--black-color)]">
          현재 북동쪽 섹터에서 적 기갑부대의 이동이 감지되었습니다. C1과 C2
          플랫폼으로부터 수집된 데이터를 종합 분석한 결과, 약 3대의 전차와 15명
          내외의 보병이 확인되었습니다.
        </p>
      </div>
    </div>
  );
}
