const isRowComplete = (row, drawnNumbers) =>
  row.every((number) => number === "FREE" || drawnNumbers.includes(number));

const isColumnComplete = (board, colIndex, drawnNumbers) =>
  board.every(
    (row) => row[colIndex] === "FREE" || drawnNumbers.includes(row[colIndex])
  );

const isDiagonalComplet = (board, drawnNumbers) => {
  const leftToRight = board.every(
    (row, i) => row[i] === "FREE" || drawnNumbers.includes(row[i])
  );
  return leftToRight;
};

const isSecondaryDiagonalComplete = (board, drawnNumbers) => {
  const rightToLeft = board.every(
    (row, i) =>
      row[row.length - 1 - i] === "FREE" ||
      drawnNumbers.includes(row[row.length - 1 - i])
  );
  return rightToLeft;
};

const isFull = (board, drawnNumbers) =>
  board
    .flat()
    .every((number) => number === "FREE" || drawnNumbers.includes(number));

export const checkWinCondition = (board, drawnNumbers) => {
  for (let i = 0; i < board.length; i++) {
    if (isRowComplete(board[i], drawnNumbers)) return "Fila Completa";
    if (isColumnComplete(board, i, drawnNumbers)) return "Columna Completa";
  }

  if (isDiagonalComplet(board, drawnNumbers)) return "Diagonal Principal";
  if (isSecondaryDiagonalComplete(board, drawnNumbers))
    return "Diagonal Secundaria";
  if (isFull(board, drawnNumbers)) return "Tablero Completo";
  return "Descalificado";
};
