import { useState, useEffect } from "react";

export const Calendar = () => {
  const today = new Date();
  const [now, setNow] = useState(new Date());
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const goToPreviousMonth = () => {
    setSelectedDay(null);
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setSelectedDay(null);
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDay(today.getDate());
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") {
        setSelectedDay(null);
        setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
      }
      if (e.key === "ArrowRight") {
        setSelectedDay(null);
        setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const formattedTime = now.toLocaleTimeString("en-GB");

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const isCurrentMonth =
    today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  const monthName = new Date(currentYear, currentMonth).toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      {/* Header: ◀  Month Year | Live Time  ▶ */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={goToPreviousMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all duration-150 hover:scale-110 active:scale-95 text-xs"
        >
          ◀
        </button>

        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-white tracking-wide capitalize">
            {monthName}
          </h2>
          <span className="text-slate-600 select-none">|</span>
          <span className="font-mono text-cyan-400 text-sm tracking-widest tabular-nums">
            {formattedTime}
          </span>
        </div>

        <button
          onClick={goToNextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all duration-150 hover:scale-110 active:scale-95 text-xs"
        >
          ▶
        </button>
      </div>

      {/* Today button — only visible when navigated away */}
      <div className="flex justify-center mb-3 h-6">
        {!isCurrentMonth && (
          <button
            onClick={goToToday}
            className="text-xs px-3 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 hover:text-cyan-300 transition-all duration-150 active:scale-95"
          >
            Today
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700/70 mb-4" />

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day, i) => (
          <div
            key={day}
            className={`text-xs font-semibold py-1 text-center tracking-wide ${
              i === 0 || i === 6 ? "text-rose-400" : "text-slate-400"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day grid — key triggers fade animation on month change */}
      <div
        key={`${currentYear}-${currentMonth}`}
        className="grid grid-cols-7 gap-1 calendar-fade"
      >
        {calendarDays.map((day, index) => {
          if (day === null) return <div key={index} />;

          const isToday = isCurrentMonth && day === today.getDate();
          const isSelected = isCurrentMonth && day === selectedDay;
          const colIndex = index % 7;
          const isWeekend = colIndex === 0 || colIndex === 6;

          return (
            <div
              key={index}
              onClick={() => setSelectedDay(day)}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-sm font-medium
                transition-all duration-150 cursor-pointer select-none
                ${
                  isToday
                    ? "bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/40 ring-2 ring-cyan-400/50 scale-105"
                    : isSelected
                    ? "bg-slate-600 text-white ring-2 ring-slate-400/60 scale-105"
                    : isWeekend
                    ? "bg-slate-700/50 text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 hover:scale-105"
                    : "bg-slate-700/50 text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-200 hover:scale-105"
                }
                active:scale-95
              `}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Keyboard hint */}
      <p className="text-center text-slate-600 text-xs mt-4 select-none">
        ← → arrow keys to navigate
      </p>
    </div>
  );
};
