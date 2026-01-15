import React from "react";
import { Clock } from "./Clock.jsx";
import { Calendar} from "./Calendar.jsx"

export const MainPage = () => {
  return (
    <div className="w-[350px] mx-auto mt-6 p-6 rounded-xl bg-gray-900 text-white text-center font-sans">
      <h1 className="text-2xl font-bold mb-2">Digital Clock</h1>

      <Clock />
      <Calendar />
    </div>
  );
};