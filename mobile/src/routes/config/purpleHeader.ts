// Altera a cor do header da página para roxo.
// Passado ao argumento options de uma Screen.

const purpleHeader = {
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#7D5CD7',
    elevation: 0, // Remove a sombra no Android
    shadowOpacity: 0, // Remove a sombra no iOS
  },
};

export default purpleHeader;
