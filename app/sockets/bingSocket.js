const { RandomNumber, generarTablerosUnicos } = require("../../generateTable");

let gameState = {
  players: [],
  drawnNumbers: [],
  winner: null,
};

const setupBingoSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Jugador en cola: ", socket.id);

    socket.on("joinGame", (players) => {
      gameState.players.push({
        id: socket.id,
        username: players.username,
        card: generarTablerosUnicos(),
      });
      console.log(`${players.username} se unió al juego`);
      io.emit("updatePlayers", gameState.players);
    });

    socket.on("drawNumer", () => {
      const newNumber = RandomNumber(gameState.drawnNumbers);
      gameState.drawnNumbers.push(newNumber);
      console.log("Número sorteado:", newNumber);
      io.emit("numberDrawn", newNumber);
    });

    socket.on("markNumber", (data) => {
      console.log(`${data.username} marcó el número ${data.number}`);
      io.emit("numberMarked", data);
    });

    socket.on("declararWinner", (winner) => {
      gameState.winner = winner;
      console.log(`${winner.username} ganó el juego`);
      io.emit("juego Terminado", winner);
      gameState.players = [];
      gameState.winner = null;
      gameState.drawnNumbers = [];
    });
  });
};
module.exports = setupBingoSocket;
