import React from "react";
import {
  ILessonSetup,
  ISquare,
  SquareColor,
  ColoredSquare
} from "../components/types";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const generateSquaresForGridLengthAndWidth = ({
  width,
  height,
  getSquareInfo
}: {
  width: number;
  height: number;
  getSquareInfo: (
    j: number,
    i: number
  ) => {
    isEmpty: boolean;
    color: SquareColor;
  };
}): ISquare[] => {
  const squares: ISquare[] = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const { isEmpty, color } = getSquareInfo(j, i);
      if (!isEmpty) {
        squares.push({
          id: width * i + j,
          x: j,
          y: i,
          color
        });
      }
    }
  }
  return squares;
};

const gridHeight = getRandomInt(3) * 2 + 3;
const gridWidth = 2 * gridHeight - 1;

const initialSquares = generateSquaresForGridLengthAndWidth({
  height: gridHeight,
  width: gridWidth,
  getSquareInfo: () => {
    const isEmpty = false;
    const color = "white";
    return {
      isEmpty,
      color
    };
  }
});

export const Lesson13: ILessonSetup = {
  gridState: {
    height: gridHeight,
    width: 2 * gridHeight - 1,
    squares: initialSquares
  },
  directive: (
    <span>
      Paint a pyramind with <span style={{ color: "red" }}>{"red"}</span>{" "}
      squares. Fill in rest with{" "}
      <span style={{ color: "green" }}>{"green"}</span> use getGridHeight to get
      variable height of grid. Height will always be an odd number. Width will
      always equal twice the height minus one. So if height is three.
    </span>
  ),
  isSuccess: state => {
    return state.squares.every(square =>
      square.color === "red"
        ? square.x <= gridWidth / 2 - square.y ||
          square.x >= gridWidth / 2 + square.y
        : square.color === "green"
    );
  }
};
