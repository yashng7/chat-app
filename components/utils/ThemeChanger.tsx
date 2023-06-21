import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  MdOutlineDarkMode,
  MdComputer,
  MdOutlineLightMode,
} from "react-icons/md";
import { VscColorMode } from "react-icons/vsc";
import { Button } from "../ui/button";

const ThemeChanger = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant={"outline"}
          className="gap-2 md:w-[110px] justify-start"
        >
          <VscColorMode />
          <span className="hidden md:block">Theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-max">
        <div>
          <Button
            variant={"outline"}
            onClick={() => setTheme("dark")}
            className="gap-2 md:w-[110px] justify-start"
          >
            <MdOutlineDarkMode />
            <span className="hidden md:block">Dark</span>
          </Button>
        </div>
        <div>
          <Button
            variant={"outline"}
            onClick={() => setTheme("light")}
            className="gap-2 md:w-[110px] justify-start"
          >
            <MdOutlineLightMode />
            <span className="hidden md:block">Light</span>
          </Button>
        </div>
        <div>
          <Button
            variant={"outline"}
            onClick={() => setTheme("system")}
            className="gap-2 md:w-[110px] justify-start"
          >
            <MdComputer />
            <span className="hidden md:block">System</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeChanger;
