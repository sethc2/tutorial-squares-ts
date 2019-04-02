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

function getRandomColor(): ColoredSquare {
  const randomInt = getRandomInt(3);
  return randomInt === 0 ? "red" : randomInt === 1 ? "green" : "purple";
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

const initialSquares = generateSquaresForGridLengthAndWidth({
  height: 2,
  width: 10,
  getSquareInfo: () => {
    const isEmpty = false;
    const color = "white";
    return {
      isEmpty,
      color
    };
  }
});

const winningColor = getRandomColor();

export const Lesson5: ILessonSetup = {
  gridState: {
    height: 2,
    width: 10,
    squares: initialSquares
  },
  colorToSet: winningColor,
  directive: (
    <span>
      Change all white squares to{" "}
      <span style={{ color: winningColor }}>{winningColor}</span>. use
      setColor(specifiedColor)
    </span>
  ),
  isSuccess: state => {
    return state.squares.every(x => x.color === winningColor);
  }
};
