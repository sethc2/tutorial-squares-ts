export type PlainSquare = "grey";
export type LitSquare = "yellow";
export type UnlitSquare = "blue";
export type LightableSquare = LitSquare | UnlitSquare;
export type UncoloredSquare = "white";
export type ColoredSquare = "red" | "green" | "purple";
export type ColorableSquares = UncoloredSquare | ColoredSquare;

export type SquareColor = PlainSquare | LightableSquare | ColorableSquares;

export interface ISquare {
  id: number;
  x: number;
  y: number;
  color: SquareColor;
  value?: number;
}

export interface IArrowState {
  x: number;
  y: number;
  direction: "left" | "right" | "up" | "down";
}

export interface IGridState {
  height: number;
  width: number;
  squares: ISquare[];
}

export interface ILessonSetup {
  gridState: IGridState;
  directive: string;
  isSuccess: (gridState: IGridState) => boolean;
  colorToSet?: SquareColor;
  numberOfSquaresToColor?: number;
}

export interface ILessonCommands {
  /**
   * Move the forward one space if possible
   */
  moveForward: () => void;
  /**
   * Turn the arror right (90 degrees clockwise)
   */
  turnRight: () => void;
  /**
   * Turn the arror left (90 degrees counter-clockwise)
   */
  turnLeft: () => void;
  /**
   * Toggle a lightable square that is off (blue) to on (yellow)
   */
  toggleOnOff: () => void;
  /**
   * Returns true if a lightable square is on
   */
  isOn: () => boolean;
  /**
   * Gets the color to set colorable (white) squares
   */
  getColorToSet: () => "red" | "green" | "purple";
  /**
   * Sets a colorable square to a specific color. (once set cannot be changed)
   */
  setColor: (color: "red" | "green" | "purple") => void;
  /**
   * Gets a value of a colorable square
   */
  getValueOfSquare: () => number;
  /**
   * Gets number of squares to set to a certain color.
   */
  getNumberofSquaresToColor: () => number;
}

// static grid and squares simple commands, move forward and so on
export type Lesson1Commands = Pick<
  ILessonCommands,
  "moveForward" | "toggleOnOff"
>;

// static grid and squares more commands move forward and turn
export type Lesson2Commands = Pick<
  ILessonCommands,
  "moveForward" | "turnRight" | "turnLeft" | "toggleOnOff"
>;

// function commands - static grid and squares, but make large enough that it would be tedious to write everything
export type Lesson3Commands = Lesson2Commands;

// static grid, random squares . conditional isOn must be used. Teaches "if statement"
export type Lesson4Commands = Pick<
  ILessonCommands,
  "moveForward" | "turnRight" | "turnLeft" | "toggleOnOff" | "isOn"
>;

// static grid - static squares - with white squares in spots, change squares to purple. teaches that parameters can be passed to functions
export type Lesson4Point5Commands = Pick<
  ILessonCommands,
  "moveForward" | "turnRight" | "turnLeft" | "setColor"
>;

// static grid - static squares - with white squares in spots, change to color specified at random
// teaches "if else" statement.
export type Lesson5Commands = Pick<
  ILessonCommands,
  "moveForward" | "turnRight" | "turnLeft" | "getColorToSet" | "setColor"
>;

// Static grid- random squares Randomly assign value to white squares, paint squares greater than 3. teaches > operator
export type Lesson6Commands = Pick<
  ILessonCommands,
  "moveForward" | "turnRight" | "turnLeft" | "setColor" | "getValueOfSquare"
>;

// Static grid - Randomly assign value to white squares, paint squares 2 or 4 teaches == operator
export type Lesson7Commands = Pick<
  ILessonCommands,
  "moveForward" | "turnRight" | "turnLeft" | "setColor" | "getValueOfSquare"
>;

// Static grid - Randomly assign value to white squares, paint squares not equal to 3 teaches ! operator
export type Lesson8Commands = Pick<
  ILessonCommands,
  | "moveForward"
  | "turnRight"
  | "turnLeft"
  | "toggleOnOff"
  | "setColor"
  | "getValueOfSquare"
>;

// Static grid - random squares Randomly assign value to white squares, paint squares less than 3 red, 4 and 5 green, and greater than 6 purple - teaches && operator or || operator
export type Lesson9Commands = Pick<
  ILessonCommands,
  | "moveForward"
  | "turnRight"
  | "turnLeft"
  | "toggleOnOff"
  | "setColor"
  | "getValueOfSquare"
>;

// Static grid - Sum up numbers of white squares if total > 10 paint last square red else paint purple. teaches re + operator
export type Lesson10Commands = Pick<
  ILessonCommands,
  | "moveForward"
  | "turnRight"
  | "turnLeft"
  | "toggleOnOff"
  | "setColor"
  | "getValueOfSquare"
>;

// static grid - all white squares, paint X number of squares red teach concept of while loop while adding up a value to compare.
export type Lesson13Commands = Pick<
  ILessonCommands,
  | "moveForward"
  | "turnRight"
  | "turnLeft"
  | "toggleOnOff"
  | "setColor"
  | "getNumberofSquaresToColor"
>;

// static grid - all white squares, pass in an object teach '.' operator.
export type Lesson14Commands = Pick<
  ILessonCommands,
  | "moveForward"
  | "turnRight"
  | "turnLeft"
  | "toggleOnOff"
  | "setColor"
  | "getNumberofSquaresToColor"
>;

// Big grid 20x20 all white squares paint pyramid x number of rows tall
export type Lesson11Commands = Pick<
  ILessonCommands,
  | "moveForward"
  | "turnRight"
  | "turnLeft"
  | "toggleOnOff"
  | "isOn"
  | "toggleOnOff"
>;
