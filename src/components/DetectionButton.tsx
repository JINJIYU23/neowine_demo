import React from "react";

interface DetectionLevelButtonProps {
  level: string;
  color: string;
}

export default function DetectionLevelButton({
  level,
  color,
}: DetectionLevelButtonProps) {
  return (
    <button
      className="rounded-[10px] p-2 flex items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <span className="relative top-[1px] text-[var(--white-bg)]">{level}</span>
    </button>
  );
}
