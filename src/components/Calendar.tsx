import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf("month").day(); // 0 (Sun) - 6 (Sat)
  const today = dayjs();

  const goToPreviousMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentDate((prev) => prev.add(1, "month"));
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xs rounded-lg p-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronLeft />
        </button>
        <h2 className="text-lg font-semibold">{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronRight />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-gray-500 font-medium">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-0 text-center">
        {/* Empty spaces for first day offset */}
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isToday = currentDate.year() === today.year() &&
                          currentDate.month() === today.month() &&
                          day === today.date();

          return (
            <div
              key={day}
              className={`p-2 cursor-pointer rounded-[50px] transition-all ${
                isToday ? "bg-purple-500 text-white font-bold" : "hover:bg-gray-200"
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

export default Calendar;
