"use client";

import React, { useState } from "react";
import { DateRange } from "react-date-range";

const DateRangePicker = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleDateChange = (item: any) => {
    const { startDate, endDate } = item.selection;
    if (startDate && endDate) {
      setDateRange([
        {
          startDate,
          endDate,
          key: "selection",
        },
      ]);
      setIsCalendarVisible(false); // Oculta el calendario al seleccionar las fechas
    }
  };

  // Toggle visibility of the calendar when the input is clicked
  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  // Function to format the date as 'Mon 7 Nov'
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short", // Abreviatura del día (Mon, Tue)
      day: "numeric", // Día (7, 9)
      month: "short", // Abreviatura del mes (Nov, Dec)
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="flex">
        {/* Input para la fecha */}
        <input
          type="text"
          onClick={toggleCalendar}
          value={`${formatDate(dateRange[0].startDate)} - ${formatDate(
            dateRange[0].endDate
          )}`}
          readOnly
          className="w-fit h-fit p-2 text-base bg-transparent cursor-pointer focus:outline-transparent rounded-xl"
        />
      </div>

      {/* Mostrar el calendario solo cuando se haga clic en el input */}
      {isCalendarVisible && (
        <div className="absolute top-full mt-2">
          <DateRange
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            rangeColors={["#009375"]}
            className="shadow-md rounded-md w-full"
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
