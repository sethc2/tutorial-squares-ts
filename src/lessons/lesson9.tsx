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
    value: number;
  };
}): ISquare[] => {
  const squares: ISquare[] = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const { isEmpty, color, value } = getSquareInfo(j, i);
      if (!isEmpty) {
        squares.push({
          id: width * i + j,
          x: j,
          y: i,
          color,
          value
        });
      }
    }
  }
  return squares;
};

const randomNumbers = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 1, 2, 1, 3, 3, 3, 1, 2, 1, 1, 1, 2, 1, 1, 1, 3, 3, 3],
  [1, 2, 1, 2, 1, 3, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 3, 1, 3],
  [1, 2, 2, 2, 1, 3, 3, 3, 1, 2, 1, 1, 1, 2, 1, 1, 1, 3, 1, 3],
  [1, 2, 1, 2, 1, 3, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 3, 1, 3],
  [1, 2, 1, 2, 1, 3, 3, 3, 1, 2, 2, 2, 1, 2, 2, 2, 1, 3, 3, 3],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 3, 1, 1, 1, 3, 2, 2, 2, 1, 3, 3, 3, 1, 2, 1, 1, 3, 3, 1],
  [1, 3, 1, 1, 1, 3, 2, 1, 2, 1, 3, 1, 3, 1, 2, 1, 1, 3, 1, 3],
  [1, 3, 1, 1, 1, 3, 2, 1, 2, 1, 3, 3, 1, 1, 2, 1, 1, 3, 1, 3],
  [1, 3, 1, 3, 1, 3, 2, 1, 2, 1, 3, 1, 3, 1, 2, 1, 1, 3, 1, 3],
  [1, 3, 3, 3, 3, 3, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 1, 3, 3, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const initialSquares = generateSquaresForGridLengthAndWidth({
  height: 16,
  width: 20,
  getSquareInfo: (x, y) => {
    const isEmpty = false;
    const color = "white";
    const valueInRandomNumber = randomNumbers[y][x];
    const number =
      valueInRandomNumber === 1
        ? getRandomInt(3) + 1
        : valueInRandomNumber === 2
        ? getRandomInt(2) + 4
        : getRandomInt(3) + 6;
    return {
      isEmpty,
      color,
      value: number
    };
  }
});

export const Lesson9: ILessonSetup = {
  gridState: {
    height: 16,
    width: 20,
    squares: initialSquares
  },
  directive: (
    <span>
      If value is less than or equal to three paint the square{" "}
      <span style={{ color: "red" }}>{"red"}</span>
      If value equals 4 or 5 paint square{" "}
      <span style={{ color: "green" }}>{"green"}</span>
      If value is greater than or equal to 6 paint square{" "}
      <span style={{ color: "purple" }}>{"purple"}</span> Use getValueOfSquare;
    </span>
  ),
  isSuccess: state => {
    return state.squares.every(
      x =>
        !!x.value &&
        !!(x.value <= 3
          ? x.color === "red"
          : x.value === 4 || x.value === 5
          ? x.color === "green"
          : x.color === "purple")
    );
  }
};
