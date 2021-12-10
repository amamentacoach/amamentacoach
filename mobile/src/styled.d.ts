// import original module declarations
import 'styled-components/native';

import theme from 'config/theme';

type Theme = typeof theme;

// and extend them!
declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}
