import { ILessonSetup } from "../components/types";

export const Lesson2: ILessonSetup = {
  gridState: {
    height: 3,
    width: 3,
    squares: [
      {
        id: 0,
        x: 0,
        y: 0,
        color: "grey"
      },
      {
        id: 1,
        x: 1,
        y: 0,
        color: "grey"
      },
      {
        id: 2,
        x: 2,
        y: 0,
        color: "grey"
      },
      {
        id: 3,
        x: 2,
        y: 1,
        color: "grey"
      },
      {
        id: 4,
        x: 2,
        y: 2,
        color: "blue"
      }
    ]
  },
  directive: "Light up the blue square",
  isSuccess: state => {
    const setSquares = state.squares.filter(
      square => square.color === "yellow"
    );
    if (setSquares.length === 1 && setSquares[0].id === 4) {
      return true;
    }
    return false;
  }
};
