import { useEffect } from "react";
import { themes } from "../../constants/config";
import { useStore } from "../../store/hooks";
import { IColor } from "../../types";

const ThemeSwitcher = () => {
  const {
    dispatch,
    store: { theme },
  } = useStore();

  useEffect(() => {
    theme.colors.map((color: IColor) => {
      const key1 = `--theme-${color.name}`;
      const value1 = color.value;
      document.documentElement.style.setProperty(key1, value1);
    });
  }, [theme]);
  return (
    <div className="theme-switcher">
      {themes.map((theme, i) => (
        <button
          key={theme.name}
          onClick={() => {
            dispatch({ type: "THEME", value: i });
          }}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
};
export default ThemeSwitcher;
