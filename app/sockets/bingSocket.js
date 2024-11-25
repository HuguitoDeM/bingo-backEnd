const { checkWinCondition } = require("../game/checkBingoWin");
const {
  RandomNumber,
  generarTablerosUnicos,
} = require("../game/generateTable");

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

    socket.on("MarkBingo", (winner) => {
      const winCondition = checkWinCondition(
        winner.card,
        gameState.drawnNumbers
      );
      if (winCondition) {
        gameState.winner = winner;
        console.log(`${winner.username} ganó el juego`);
        io.emit("juego Terminado", winner);
        gameState.players = [];
        gameState.winner = null;
        gameState.drawnNumbers = [];
      } else {
        console.log(`Jugador descalificado ${winner.username}`, winner.id);
        gameState.players = gameState.players.filter(
          (player) => player.id !== winner.id
        );
        socket.emit("descalificado", {
          message: "No tienes un Bingo. Has sido descalificado.",
        });
      }
    });
  });
};
module.exports = setupBingoSocket;
