// Altera a cor do header da página.
// Passado ao argumento options de uma Screen.

interface HeaderConfig {
  headerTintColor: string;
  headerStyle: {
    backgroundColor: string;
    elevation: number;
    shadowOpacity: number;
  };
}

// Cria uma configuração para as cores do header do react navigation.
const createColorHeader = (
  color: string,
  textColor: string = 'black',
): HeaderConfig => ({
  headerTintColor: textColor,
  headerStyle: {
    backgroundColor: color,
    elevation: 0, // Remove a sombra no Android
    shadowOpacity: 0, // Remove a sombra no iOS
  },
});

export default createColorHeader;
