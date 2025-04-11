import { useTheme } from "@/components/ui/theme-provider";
import { Button } from "@/components/ui/button";

interface ThemeSwitcherProps {
  mobile?: boolean;
}

const ThemeSwitcher = ({ mobile = false }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (mobile) {
    return (
      <button onClick={toggleTheme}>
        <i className={`fas ${theme === "light" ? "fa-sun text-[#000042]" : "fa-moon text-white"}`}></i>
      </button>
    );
  }

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full bg-gray-100 dark:bg-[#000042]/60 text-[#000042] dark:text-white"
    >
      {theme === "light" ? (
        <i className="fas fa-sun"></i>
      ) : (
        <i className="fas fa-moon"></i>
      )}
    </Button>
  );
};

export default ThemeSwitcher;
