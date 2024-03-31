export interface IRow {
  name: string;
  squares: number[];
}

export interface ITheme {
  name: string;
  sounds: string[];
  colors: {
    squareActive: string;
  };
}
