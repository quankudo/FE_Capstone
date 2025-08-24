import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="flex items-center gap-2">
      {/* Light Icon */}
      <FiSun className={`h-6 w-6 ${!isDark ? "text-yellow-500" : "text-gray-400"}`} />

      {/* Toggle Switch */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`relative w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 ${
          isDark ? "bg-gray-700" : "bg-gray-300"
        }`}
      >
        <span
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isDark ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>

      {/* Dark Icon */}
      <FiMoon className={`h-6 w-6 ${isDark ? "text-blue-400" : "text-gray-400"}`} />
    </div>
  );
}
