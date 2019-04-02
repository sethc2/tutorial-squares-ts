import { ILessonSetup, ISquare, SquareColor } from "../components/types";

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

export const Lesson3: ILessonSetup = {
  gridState: {
    height: 2,
    width: 10,
    squares: generateSquaresForGridLengthAndWidth({
      height: 2,
      width: 10,
      getSquareInfo: (x, y) => {
        const isEmpty = false;
        const color = (x + y) % 2 ? "grey" : "blue";
        return {
          isEmpty,
          color
        };
      }
    })
  },
  directive: "Light up all blue squares, use functions to simplify",
  isSuccess: state => {
    const setSquares = state.squares.filter(
      square => square.color === "yellow"
    );
    const unSetSquares = state.squares.filter(
      square => square.color === "blue"
    );
    if (setSquares.length === 10 && unSetSquares.length === 0) {
      return true;
    }
    return false;
  }
};
