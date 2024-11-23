const TableroUsuario = [];

const getRandomArbitrary = (min, max) => {
  for (let i = 0; i < 5; i++) {
    const numeroTablero = Math.random() * (max - min) + min;
    TableroUsuario.push(numeroTablero);
  }
  return;
};

getRandomArbitrary(1, 15);
getRandomArbitrary(16, 30);
getRandomArbitrary(31, 45);
getRandomArbitrary(46, 60);
getRandomArbitrary(61, 75);
