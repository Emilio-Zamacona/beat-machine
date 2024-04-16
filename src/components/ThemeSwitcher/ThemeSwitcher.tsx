import { themes } from "../../constants/config";
import { useStore } from "../../store/hooks";

const ThemeSwitcher = () => {
  const { dispatch } = useStore();

  return (
    <div className="config">
      <p className="config__label">Drum:</p>
      <div className="config__action">
        {themes.map((theme, i) => (
          <button
            key={theme.name}
            className="main-btn"
            onClick={() => {
              dispatch({ type: "THEME", value: i });
            }}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
};
export default ThemeSwitcher;
