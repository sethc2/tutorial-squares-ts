import { Lesson5Commands } from "../components/types";

export default function getProgram({
  moveForward, // Move's arrow forward in direction it is facing one square
  turnRight, // Turn arrow right (90 degrees clockwise)
  turnLeft, // Turn arrow left (90 degrees counter-clockwise)
  getColorToSet, // returns the color the program wants you to set this turn,
  setColor // sets the color to a value "red", "green" or "purple"
}: Lesson5Commands) {
  // Call commands in order here.
  var colorToSet = getColorToSet();
  function setColorAndMoveForward() {
    setColor(colorToSet);
    moveForward();
  }
  function setColorAndMoveForward11Times() {
    setColorAndMoveForward();
    setColorAndMoveForward();
    setColorAndMoveForward();
    setColorAndMoveForward();
    setColorAndMoveForward();
    setColorAndMoveForward();
    setColorAndMoveForward();
    setColorAndMoveForward();
    setColorAndMoveForward();
    setColorAndMoveForward();
  }
  setColorAndMoveForward11Times();
  turnRight();
  moveForward();
  turnRight();
  setColorAndMoveForward11Times();
}
