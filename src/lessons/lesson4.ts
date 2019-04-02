import { ILessonSetup, ISquare, SquareColor } from "../components/types";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomBool() {
  return getRandomInt(2) % 2 === 0;
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
  getSquareInfo: (x, y) => {
    const isEmpty = false;
    const color =
      x + y === 11
        ? "blue"
        : (x + y) % 2
        ? "grey"
        : getRandomBool()
        ? "blue"
        : "yellow";
    return {
      isEmpty,
      color
    };
  }
});

const idsToSet: { [id: string]: boolean } = initialSquares
  .filter(x => x.color !== "grey")
  .map(x => x.id)
  .reduce((prev, curr) => ({ ...prev, [curr]: true }), {});

export const Lesson4: ILessonSetup = {
  gridState: {
    height: 2,
    width: 10,
    squares: initialSquares
  },
  directive:
    "Light up all blue squares while keeping yellow squares on. Use if(isOn()) to check if square is on.",
  isSuccess: state => {
    return !state.squares.filter(x => x.color === "blue").length;
  }
};
