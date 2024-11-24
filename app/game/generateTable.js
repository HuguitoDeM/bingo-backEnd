export const generarTablerosUnicos = () => {
  const TableroUsuario = [];
  const getRandomArbitrary = (min, max) => {
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < 5) {
      const number = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueNumbers.add(number);
    }
    return Array.from(uniqueNumbers);
  };

  TableroUsuario.push(getRandomArbitrary(1, 15));
  TableroUsuario.push(getRandomArbitrary(16, 30));
  TableroUsuario.push(getRandomArbitrary(31, 45));
  TableroUsuario.push(getRandomArbitrary(46, 60));
  TableroUsuario.push(getRandomArbitrary(61, 75));

  TableroUsuario[2][2] = "FREE";
  return TableroUsuario;
};

export const RandomNumber = (drawnNumbers) => {
  let number;
  do {
    number = Math.floor(Math.random() * 75) + 1;
  } while (drawnNumbers.includes(number));
  return number;
};
