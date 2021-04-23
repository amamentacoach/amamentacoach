// import original module declarations
import 'styled-components/native';

// and extend them!
declare module 'styled-components/native' {
  export interface DefaultTheme {
    primary: string;
    accent: string;
    error: string;
    success: string;
    black: string;
    white: string;
    grey: string;
    brightGrey: string;
    babyBlue: string;
    babyPurple: string;
    babyGreen: string;
    babyPink: string;
  }
}
