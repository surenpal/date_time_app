import React, { useState } from "react";

export const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push("");
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isCurrentMonth =
    today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={goToPreviousMonth}
          className="bg-gray-700 px-3 py-1 rounded-md"
        >
          ◀
        </button>

        <h2 className="text-xl font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button
          onClick={goToNextMonth}
          className="bg-gray-700 px-3 py-1 rounded-md"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1 font-bold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const isToday = isCurrentMonth && day === today.getDate();

          return (
            <div
              key={index}
              className={`py-2 rounded-md ${
                isToday
                  ? "bg-cyan-400 text-black font-bold"
                  : "bg-gray-800 text-white"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};