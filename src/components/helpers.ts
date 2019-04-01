import { SquareColor } from "./types";

export function isLightable(squareColor: SquareColor) {
  return squareColor !== "grey";
}

export function isLit(squareColor: SquareColor) {
  return squareColor === "yellow";
}

export function moveForward() {}
