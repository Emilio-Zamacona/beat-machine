export interface IRow {
  name: string;
  squares: number[];
}

export interface ITheme {
  name: string;
  sounds: ISound[];
  colors: IColor[];
}
export interface ISound {
  name: string;
  color: string | boolean;
}
export interface IColor {
  name: string;
  value: string;
}
