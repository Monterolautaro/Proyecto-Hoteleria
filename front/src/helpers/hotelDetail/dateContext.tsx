"use client";

import { IDateContext } from "@/interfaces/dateContext";
import { createContext, ReactNode, useContext, useState } from "react";

const DateContext = createContext<IDateContext | null>(null);

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const [diffDays, setDiffDays] = useState<number | null>(null);

  return (
    <DateContext.Provider value={{ diffDays, setDiffDays }}>
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
