import { themes } from "../../constants/config";
import { useStore } from "../../store/hooks";

const ThemeSwitcher = () => {
  const { dispatch } = useStore();
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
