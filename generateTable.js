export const generarTablerosUnicos = () => {
  const TableroUsuario = [];

  const getRandomArbitrary = (min, max) => {
    for (let i = 0; i < 5; ) {
      min = Math.ceil(min);
      max = Math.floor(max);
      const numeroTablero = Math.floor(Math.random() * (max - min) + min);
      if (!TableroUsuario.includes(numeroTablero)) {
        TableroUsuario.push(numeroTablero);
        i++;
      }
    }
    return;
  };

  getRandomArbitrary(1, 15);
  getRandomArbitrary(16, 30);
  getRandomArbitrary(31, 45);
  getRandomArbitrary(46, 60);
  getRandomArbitrary(61, 75);

  return TableroUsuario;
};

export const RandomNumber = (drawnNumbers) => {
  let number;
  do {
    number = Math.floor(Math.random() * 75) + 1;
  } while (drawnNumbers.includes(number));
  return number;
};
