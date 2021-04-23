// Altera a cor do header da página.
// Passado ao argumento options de uma Screen.

const createColorHeader = (color: string, textColor?: string) => ({
  headerTintColor: textColor || 'black',
  headerStyle: {
    backgroundColor: color,
    elevation: 0, // Remove a sombra no Android
    shadowOpacity: 0, // Remove a sombra no iOS
  },
});

export default createColorHeader;
