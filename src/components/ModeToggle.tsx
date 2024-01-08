import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/utils/contexts/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <div className="w-[5rem] bg-black/25 border border-indigo-300 dark:bg-white rounded-full flex justify-between items-center p-1 h-fit shadow-inner shadow-black/25 dark:shadow-inner dark:shadow-black/50  dark:border-white/10">
        <div onClick={() => setTheme("light")} className="cursor-pointer">
          <Sun className="h-[2rem] w-[2rem]  bg-white/80 text-yellow-400 rounded-full p-1 opacity-100 dark:opacity-0 transition-all translate-x-0 dark:translate-x-9" />
        </div>
        <div onClick={() => setTheme("dark")} className="cursor-pointer">
          <Moon className="h-[2rem] w-[2rem] cursor-pointer bg-black/80 text-white rounded-full p-1 opacity-0 dark:opacity-100 transition-all -translate-x-9 dark:translate-x-0" />
        </div>
      </div>
    </>
  );
}
