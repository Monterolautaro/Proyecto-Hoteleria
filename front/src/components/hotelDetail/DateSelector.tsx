/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import { differenceInDays, format } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDateContext } from "@/helpers/hotelDetail/dateContext";

const DateRangePicker = () => {
  const { setDiffDays, setEndDateContext, setStartDateContext } =
    useDateContext();

  const customLocale = {
    ...enUS,
    customLabels: {
      early: "Start Date", // Cambiar "Early"
      continuous: "End Date", // Cambiar "Continuous"
    },
  };

  useEffect(() => {
    setDiffDays(0);
  }, []);
  const [dateRange, setDateRange] = useState([
    {
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    },
  ]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (item: any) => {
    const { startDate, endDate } = item.selection;
    setDateRange([
      {
        startDate,
        endDate,
        key: "selection",
      },
    ]);
  };

  useEffect(() => {
    const { startDate, endDate } = dateRange[0];
    if (startDate && endDate) {
      const diffDays = differenceInDays(endDate, startDate);
      setStartDateContext(startDate);
      setEndDateContext(endDate);
      setDiffDays(diffDays);
    }
  }, [dateRange]);

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return format(date, "EEE d MMM");
  };

  // Manejar clics fuera del calendario para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarVisible(false);
      }
    };

    if (isCalendarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarVisible]);

  return (
    <div className="relative flex flex-col items-center w-full ">
      <div className="flex w-full">
        {/* Input para la fecha */}
        <input
          type="text"
          onClick={toggleCalendar}
          value={
            dateRange[0].startDate && dateRange[0].endDate
              ? `${formatDate(dateRange[0].startDate)} - ${formatDate(
                  dateRange[0].endDate
                )}`
              : "Start date - End date" // Placeholder si no hay fechas seleccionadas
          }
          readOnly
          className="w-full text-center  h-fit p-2 text-base bg-transparent cursor-pointer focus:outline-transparent rounded-xl"
        />
      </div>

      {/* Mostrar el calendario solo cuando se haga clic en el input */}
      {isCalendarVisible && (
        <div
          ref={calendarRef} // Referencia para detectar clics fuera
          className="absolute top-full mt-2"
        >
          <DateRange
            locale={customLocale}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            minDate={new Date()}
            rangeColors={["#009375"]}
            className="shadow-md rounded-md w-full"
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
