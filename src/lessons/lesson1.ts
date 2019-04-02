import { ILessonSetup } from "../components/types";

export const Lesson1: ILessonSetup = {
  gridState: {
    height: 1,
    width: 3,
    squares: [
      {
        color: "grey",
        x: 0,
        y: 0,
        id: 0
      },
      {
        color: "grey",
        x: 1,
        y: 0,
        id: 1
      },
      {
        color: "blue",
        x: 2,
        y: 0,
        id: 2
      }
    ]
  },
  directive: "Light up the blue square",
  isSuccess: state => {
    const setSquares = state.squares.filter(
      square => square.color === "yellow"
    );
    if (setSquares.length === 1 && setSquares[0].id === 2) {
      return true;
    }
    return false;
  }
};
