"use client";
import { useEffect, useState } from "react";

export default function ThemeProvider({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return <>{children}</>;
}
