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

const numberToColor = getRandomInt(7) + 2;

export const Lesson11: ILessonSetup = {
  gridState: {
    height: 1,
    width: 10,
    squares: initialSquares
  },
  numberOfSquaresToColor: numberToColor,
  directive: (
    <span>
      Paint {numberToColor} squares{" "}
      <span style={{ color: "red" }}>{"red"}</span> and the rest{" "}
      <span style={{ color: "purple" }}>{"purple"}</span>{" "}
    </span>
  ),
  isSuccess: state => {
    const redSquares = state.squares.filter(x => x.color === "red").length;
    const purpleSquares = state.squares.filter(x => x.color === "purple")
      .length;
    return redSquares === numberToColor && redSquares + purpleSquares === 10;
  }
};
