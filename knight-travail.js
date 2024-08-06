import { Square } from "./square.js";

const SIZE = 8;
const board = [];

for (let i = 0; i < SIZE; i++) {
  const row = [];
  for (let j = 0; j < SIZE; j++) {
    row.push(Square(i, j));
  }
  board.push(row);
}

for (let i = 0; i < SIZE; i++) {
  for (let j = 0; j < SIZE; j++) {
    board[i][j].links = getLinks(board[i][j]);
  }
}

function resetPrev() {
  board.forEach((row) => row.forEach((square) => (square.prev = undefined)));
}

function getLinks(square) {
  const diffs = [
    { x: -1, y: -2 },
    { x: +1, y: -2 },
    { x: -1, y: +2 },
    { x: +1, y: +2 },
    { x: -2, y: -1 },
    { x: -2, y: +1 },
    { x: +2, y: -1 },
    { x: +2, y: +1 },
  ];
  return diffs
    .map((diff) => ({ x: square.x + diff.x, y: square.y + diff.y }))
    .filter(({ x, y }) => x >= 0 && x < SIZE && y >= 0 && y < SIZE)
    .map(({ x, y }) => board[x][y]);
}

function knightMoves(startXY, goalXY, pretty = false) {
  const start = board[startXY[0]][startXY[1]];
  const goal = board[goalXY[0]][goalXY[1]];
  const route = getKnightMoves(start, goal);
  console.log(getRouteString(route));
  if (pretty) {
    prettyRoute(route);
  }
}

function getKnightMoves(start, goal) {
  resetPrev();
  start.prev = null;
  const discovered = [start];
  while (discovered.length > 0) {
    let current = discovered.shift();
    if (current === goal) {
      break;
    }
    for (let link of current.links) {
      // prev property serves both as the "visited" marker for BFS
      // and the pointer for the linked-list of the route
      if (link.prev === undefined) {
        link.prev = current;
        discovered.push(link);
      }
    }
  }
  return getRouteArray(goal);
}

function getRouteArray(square) {
  let current = square;
  const array = [];
  while (current !== null) {
    array.unshift(current);
    current = current.prev;
  }
  return array;
}

function getRouteString(route) {
  let result = route.reduce(
    (acc, current) => `${acc}[${current.x},${current.y}],`,
    ""
  );
  return `[${result.slice(0, -1)}]`;
}

function prettyRoute(route) {
  const result = [];
  for (let i = 0; i < SIZE; i++) {
    result.push(Array(SIZE).fill("[  ]"));
  }
  route.forEach((square, index) => {
    result[square.x][square.y] = `[${(" " + index).slice(-2)}]`;
  });
  result.forEach((row) => console.log(row.join("")));
}

export { knightMoves };
