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
  height: 1,
  width: 10,
  getSquareInfo: () => {
    const isEmpty = false;
    const color = "white";
    const number = getRandomInt(3) + 1;
    return {
      isEmpty,
      color,
      value: number
    };
  }
});

export const Lesson10: ILessonSetup = {
  gridState: {
    height: 1,
    width: 10,
    squares: initialSquares
  },
  directive: (
    <span>
      Paint only the last square, Sum up the value of all the squares if value
      is greater than 20 paint the last square{" "}
      <span style={{ color: "red" }}>{"red"}</span> If the value is less than or
      equal to 20 paint the last square{" "}
      <span style={{ color: "purple" }}>{"purple"}</span>{" "}
    </span>
  ),
  isSuccess: state => {
    const sum = state.squares.reduce(
      (prev, curr) => prev + (curr.value || 0),
      0
    );
    return state.squares.every(
      x =>
        (x.id !== 9 && x.color === "white") ||
        (x.id === 9 && (sum > 20 ? x.color === "red" : x.color === "purple"))
    );
  }
};
