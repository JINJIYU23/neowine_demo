import React from "react";

export default function Report() {
  return (
    <div className="rounded-[10px] bg-[#BED0FF]/50 h-min-full shadow-md p-2">
      <h1 className="font-semibold text-[20px] p-1 text-[var(--blue-color)]">
        상황 분석 리포트
      </h1>
      <hr className="border-[var(--blue-color)]" />
      <div className="py-[10px]">
        <p className="text-[var(--black-color)]">
          현재 북동쪽 섹터에서 적 기갑부대의 이동이 감지되었습니다. C1
          플랫폼으로부터 수집된 데이터를 종합 분석한 결과, 약 3대의 전차와 15명
          내외의 보병이 확인되었습니다. 현재 북동쪽 섹터에서 적 기갑부대의
          이동이 감지되었습니다. C1 플랫폼으로부터 수집된 데이터를 종합 분석한
          결과, 약 3대의 전차와 15명 내외의 보병이 확인되었습니다.
        </p>
      </div>
    </div>
  );
}
