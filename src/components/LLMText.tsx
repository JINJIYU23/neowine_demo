import React from "react";
import Report from "./Report";
import Recommendation from "./Recommendation";
import ExpectedRoute from "./ExpectedRoute";

export default function LLMText() {
  return (
    <div className="grid grid-cols-3 px-[20px] mb-[20px] gap-2">
      <Report />
      <Recommendation />
      <ExpectedRoute />
    </div>
  );
}
