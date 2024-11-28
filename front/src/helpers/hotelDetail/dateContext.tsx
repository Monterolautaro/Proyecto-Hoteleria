"use client";

import { IDateContext } from "@/interfaces/dateContext";
import { createContext, ReactNode, useContext, useState } from "react";

const DateContext = createContext<IDateContext | null>(null);

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const [diffDays, setDiffDays] = useState<number | null>(null);
  const [startDateContext, setStartDateContext] = useState<Date | null>(null);
  const [endDateContext, setEndDateContext] = useState<Date | null>(null);
  const [people, setPeople] = useState<number | null>(1);

  return (
    <DateContext.Provider
      value={{
        diffDays,
        setDiffDays,
        startDateContext,
        setStartDateContext,
        endDateContext,
        setEndDateContext,
        people,
        setPeople,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDateContext must be used within a DateProvider");
  }
  return context;
};
