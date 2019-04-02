import { Lesson13Commands } from "../components/types";

export default function getProgram({
  moveForward, // Move's arrow forward in direction it is facing one square
  turnRight, // Turn arrow right (90 degrees clockwise)
  turnLeft, // Turn arrow left (90 degrees counter-clockwise)
  setColor, // sets the color to a value "red", "green" or "purple",
  getGridHeight,
  getGridWidth
}: Lesson13Commands) {
  // Call commands in order here.
  var gridHeight = getGridHeight();
  var gridWidth = getGridWidth();

  var currentHeight = 1;
  var currentWidth = 1;
}
