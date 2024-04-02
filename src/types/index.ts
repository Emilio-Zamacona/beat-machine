export interface IRow {
  name: string;
  squares: number[];
}

export interface ITheme {
  name: string;
  sounds: ISound[];
  colors: {
    squareActive: string;
  };
}
export interface ISound {
  name: string;
  color: string | boolean;
}
