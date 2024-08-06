import { knightMoves } from "./knight-travail.js";

console.log("[0,0] to [7,7]");
knightMoves([0, 0], [7, 7]);

console.log("\n[1,2] to [3,4]");
knightMoves([1, 2], [3, 4]);

console.log("\nPretty print for the same move");
knightMoves([1, 2], [3, 4], true);
