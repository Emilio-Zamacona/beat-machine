import { themes } from "../../constants/config";
interface IThemeSwitcher {
  onChangeTheme: (index: number) => void;
}
const ThemeSwitcher = ({ onChangeTheme }: IThemeSwitcher) => {
  return (
    <div className="theme-switcher">
      {themes.map((theme, i) => (
        <button
          key={theme.name}
          onClick={() => {
            onChangeTheme(i);
          }}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
};
export default ThemeSwitcher;
