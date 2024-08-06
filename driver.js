import { knightMoves } from "./knight-travail.js";

console.log("[0,0] -> [0,0]");
knightMoves([0, 0], [0, 0]);
// [0,0]

console.log("\n\n[3,3] -> [4,3]");
knightMoves([3, 3], [4, 3]);
// [3,3],[4,1],[2,2],[4,3]
