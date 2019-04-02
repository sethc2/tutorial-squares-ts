import {
  ILessonSetup,
  ILessonCommands,
  IProgramState,
  IArrowState,
  ISquare,
  ColoredSquare
} from "./components/types";

export const getCumulativeStates = ({
  lesson,
  getProgram
}: {
  lesson: ILessonSetup;
  getProgram: (commands: ILessonCommands) => void;
}) => {
  const { gridState, isSuccess } = lesson;
  let currentState: IProgramState = {
    gridState,
    arrowState: {
      direction: "right",
      x: 0,
      y: 0
    }
  };

  const moveForward = (currentState: IProgramState) => {
    if (currentState.arrowState.direction === "up") {
      return {
        ...currentState,
        arrowState: {
          ...currentState.arrowState,
          y: Math.max(currentState.arrowState.y - 1, 0)
        }
      };
    } else if (currentState.arrowState.direction === "right") {
      return {
        ...currentState,
        arrowState: {
          ...currentState.arrowState,
          x: Math.min(currentState.arrowState.x + 1, gridState.width - 1)
        }
      };
    } else if (currentState.arrowState.direction === "down") {
      return {
        ...currentState,
        arrowState: {
          ...currentState.arrowState,
          y: Math.min(currentState.arrowState.y + 1, gridState.height - 1)
        }
      };
    } else {
      return {
        ...currentState,
        arrowState: {
          ...currentState.arrowState,
          x: Math.max(currentState.arrowState.x - 1, 0)
        }
      };
    }
  };

  const turnLeft = (currentState: IProgramState): IProgramState => {
    if (currentState.arrowState.direction === "up") {
      return {
        ...currentState,
        arrowState: {
          ...currentState.arrowState,
          direction: "left"
        }
      };
    } else if (currentState.arrowState.direction === "right") {
      return {
        ...currentState,
        arrowState: {
          ...currentState.arrowState,
          direction: "up"
        }
      };
    } else if (currentState.arrowState.direction === "down") {
      return {
        ...currentState,
        arrowState: {
          ...currentState.arrowState,
          direction: "right"
        }
      };
    } else {
      return {
        ...currentState,
        arrowState: {
          ...currentState.arrowState,
          direction: "down"
        }
      };
    }
  };

  const turnRight = (currentState: IProgramState): IProgramState => {
    if (currentState.arrowState.direction === "up") {
      return {
        ...currentState,
        arrowState: {
          ...currentState.arrowState,
          direction: "right"
        }
      };
    } else if (currentState.arrowState.direction === "right") {
      return {
        ...currentState,
        arrowState: {
          ...currentState.arrowState,
          direction: "down"
        }
      };
    } else if (currentState.arrowState.direction === "down") {
      return {
        ...currentState,
        arrowState: {
          ...currentState.arrowState,
          direction: "left"
        }
      };
    } else {
      return {
        ...currentState,
        arrowState: {
          ...currentState.arrowState,
          direction: "up"
        }
      };
    }
  };

  const toggleOnOff = (currentState: IProgramState): IProgramState => {
    return {
      ...currentState,
      gridState: {
        ...currentState.gridState,
        squares: currentState.gridState.squares.map(
          (square): ISquare => {
            if (
              currentState.arrowState.x === square.x &&
              currentState.arrowState.y === square.y
            ) {
              if (square.color === "grey") {
                return square;
              }
              return {
                ...square,
                color: square.color === "yellow" ? "blue" : "yellow"
              };
            }
            return square;
          }
        )
      }
    };
  };

  const setColor = (
    currentState: IProgramState,
    color: ColoredSquare
  ): IProgramState => {
    return {
      ...currentState,
      gridState: {
        ...currentState.gridState,
        squares: currentState.gridState.squares.map(
          (square): ISquare => {
            if (
              currentState.arrowState.x === square.x &&
              currentState.arrowState.y === square.y
            ) {
              if (square.color !== "white") {
                return square;
              }
              return {
                ...square,
                color
              };
            }
            return square;
          }
        )
      }
    };
  };

  const cumulativeStates = [currentState];
  let success = false;

  try {
    getProgram({
      moveForward: () => {
        if (cumulativeStates.length > 5000) {
          throw "Too many states";
        }
        if (!success) {
          const possibleNextState = {
            ...currentState,
            ...moveForward(currentState),
            fromCommand: "moveForward"
          };
          const { gridState, arrowState } = currentState;

          const square = gridState.squares.find(
            square => square.x === arrowState.x && square.y === arrowState.y
          );
          if (square) {
            cumulativeStates.push(possibleNextState);
            currentState = possibleNextState;
            success = isSuccess(currentState.gridState);
          } else {
            cumulativeStates.push({
              ...currentState,
              fromCommand: "moveForward"
            });
          }
        }
      },
      turnLeft: () => {
        if (cumulativeStates.length > 5000) {
          throw "Too many states";
        }
        if (!success) {
          currentState = {
            ...turnLeft(currentState),
            fromCommand: "turnLeft"
          };
          cumulativeStates.push(currentState);
          success = isSuccess(currentState.gridState);
        }
      },
      turnRight: () => {
        if (cumulativeStates.length > 5000) {
          throw "Too many states";
        }
        if (!success) {
          currentState = {
            ...currentState,
            ...turnRight(currentState),
            fromCommand: "turnRight"
          };
          cumulativeStates.push(currentState);
          success = isSuccess(currentState.gridState);
        }
      },
      toggleOnOff: () => {
        if (cumulativeStates.length > 5000) {
          throw "Too many states";
        }
        if (!success) {
          currentState = {
            ...currentState,
            ...toggleOnOff(currentState),
            fromCommand: "toggleOnOff"
          };
          cumulativeStates.push(currentState);
          success = isSuccess(currentState.gridState);
        }
      },
      isOn: () => {
        currentState = { ...currentState, fromCommand: "isOn" };
        cumulativeStates.push(currentState);
        const square = currentState.gridState.squares.find(
          square =>
            square.x === currentState.arrowState.x &&
            square.y === currentState.arrowState.y
        );
        return square ? square.color === "yellow" : false;
      },
      getColorToSet: () => {
        currentState = { ...currentState, fromCommand: "getColorToSet" };
        cumulativeStates.push(currentState);
        return lesson.colorToSet || "green";
      },
      getNumberofSquaresToColor: () => lesson.numberOfSquaresToColor || 0,
      getValueOfSquare: () => {
        currentState = { ...currentState, fromCommand: "getValueOfSquare" };
        cumulativeStates.push(currentState);
        const square = currentState.gridState.squares.find(
          square =>
            square.x === currentState.arrowState.x &&
            square.y === currentState.arrowState.y
        );
        return square ? square.value || 0 : 0;
      },
      setColor: color => {
        if (cumulativeStates.length > 5000) {
          throw "Too many states";
        }
        if (!success) {
          currentState = {
            ...currentState,
            ...setColor(currentState, color),
            fromCommand: "setColor"
          };
          cumulativeStates.push(currentState);
          success = isSuccess(currentState.gridState);
        }
      },
      getGridHeight: () => gridState.height,
      getGridWidth: () => gridState.width
    });
  } catch (error) {
    if (error === "Too many states") {
      cumulativeStates.push({
        ...currentState,
        fromCommand: "Error too many commands"
      });
    }
  }
  return { cumulativeStates, success };
};
