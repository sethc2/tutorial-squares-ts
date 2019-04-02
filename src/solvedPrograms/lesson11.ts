import { Lesson11Commands } from "../components/types";

export default function getProgram({
  moveForward, // Move's arrow forward in direction it is facing one square
  turnRight, // Turn arrow right (90 degrees clockwise)
  turnLeft, // Turn arrow left (90 degrees counter-clockwise)
  setColor, // sets the color to a value "red", "green" or "purple"
  getNumberofSquaresToColor // returns an integer value set on the square values range from 1 to 10
}: Lesson11Commands) {
  // Call commands in order here.
  var numberOfSquaresToColor = getNumberofSquaresToColor();
  var squaresPaintedRed = 0;
  var totalSquaresLeftToPaint = 10;
  while (totalSquaresLeftToPaint !== 0) {
    if (squaresPaintedRed < numberOfSquaresToColor) {
      setColor("red");
      squaresPaintedRed = squaresPaintedRed + 1;
    } else {
      setColor("purple");
    }
    totalSquaresLeftToPaint = totalSquaresLeftToPaint - 1;
    moveForward();
  }
}
