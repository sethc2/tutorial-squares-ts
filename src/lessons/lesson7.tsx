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

const initialSquares = generateSquaresForGridLengthAndWidth({
  height: 2,
  width: 10,
  getSquareInfo: () => {
    const isEmpty = false;
    const color = "white";
    const number = getRandomInt(5) + 1;
    return {
      isEmpty,
      color,
      value: number
    };
  }
});

export const Lesson7: ILessonSetup = {
  gridState: {
    height: 2,
    width: 10,
    squares: initialSquares
  },
  directive: (
    <span>
      Change all white squares to <span style={{ color: "red" }}>{"red"}</span>{" "}
      If the value equals 2 or 4. Use getValueOfSquare;
    </span>
  ),
  isSuccess: state => {
    return state.squares.every(x =>
      x.value === 4 || x.value === 2 ? x.color === "red" : x.color === "white"
    );
  }
};
