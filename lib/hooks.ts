"use client";

import { useEffect, useState } from "react";

export function useClock(timeZone: string) {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone,
          }).format(new Date())
        );
      } catch {
        setTime("--:--");
      }
    };
    fmt();
    const id = setInterval(fmt, 15000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
  }, []);
  return fine;
}
