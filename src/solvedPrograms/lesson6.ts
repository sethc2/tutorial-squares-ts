import { Lesson6Commands } from "../components/types";

export default function getProgram({
  moveForward, // Move's arrow forward in direction it is facing one square
  turnRight, // Turn arrow right (90 degrees clockwise)
  turnLeft, // Turn arrow left (90 degrees counter-clockwise)
  setColor, // sets the color to a value "red", "green" or "purple"
  getValueOfSquare // returns an integer value set on the square values range from 1 to 10
}: Lesson6Commands) {
  // Call commands in order here.
  function setColorAndMoveForward() {
    if (getValueOfSquare() > 3) {
      setColor("purple");
    }
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
