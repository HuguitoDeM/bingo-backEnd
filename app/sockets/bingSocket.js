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

let numberDrawInterval = null;

const setupBingoSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Jugador en cola: ", socket.id);

    socket.on("joinGame", (player) => {
      gameState.players.push({
        id: socket.id,
        username: player.username,
        card: generarTablerosUnicos(),
      });
      console.log(`${player.card} tablero del jugador`);
      console.log(`${player.username} se unió al juego`);
      io.emit("updatePlayers", gameState.players);
      if (gameState.players.length === 2 && !numberDrawInterval) {
        startNumberDrawing(io);
      }
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
        stopNumberDrawing();
        resetGameState();
      } else {
        console.log(`Jugador descalificado ${winner.username}`, winner.id);
        gameState.players = gameState.players.filter(
          (player) => player.id !== winner.id
        );
        socket.emit("descalificado", {
          message: "No tienes un Bingo. Has sido descalificado.",
        });
        if (gameState.players.length === 0) {
          stopNumberDrawing();
        }
      }
    });
  });
};

const startNumberDrawing = (io) => {
  numberDrawInterval = setInterval(() => {
    const newNumber = RandomNumber(gameState.drawnNumbers);
    gameState.drawnNumbers.push(newNumber);
    console.log("Número sorteado :", newNumber);
    io.emit("numberDrawn", newNumber);

    // Opcional: Detener si se han sorteado todos los números
    if (gameState.drawnNumbers.length >= 75) {
      console.log("Se han sorteado todos los números disponibles.");
      stopNumberDrawing();
    }
  }, 5000);
};

const stopNumberDrawing = () => {
  if (numberDrawInterval) {
    clearInterval(numberDrawInterval);
    numberDrawInterval = null;
    console.log("Sorteo automático detenido.");
  }
};

const resetGameState = () => {
  gameState = {
    players: [],
    drawnNumbers: [],
    winner: null,
  };
};
module.exports = setupBingoSocket;
