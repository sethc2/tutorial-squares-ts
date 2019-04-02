import { Lesson3Commands } from "../components/types";

export default function getProgram({
  moveForward, // Move's arrow forward in direction it is facing one square
  turnRight, // Turn arrow right (90 degrees clockwise)
  turnLeft, // Turn arrow left (90 degrees counter-clockwise)
  toggleOnOff // Turn arrow right (90 degrees clockwise)
}: Lesson3Commands) {
  // Call commands in order here.
  function lightAndMoveForwardTwo() {
    toggleOnOff();
    moveForward();
    moveForward();
  }

  function ligthAndMoveForwardTwo6Times() {
    lightAndMoveForwardTwo();
    lightAndMoveForwardTwo();
    lightAndMoveForwardTwo();
    lightAndMoveForwardTwo();
    lightAndMoveForwardTwo();
  }

  ligthAndMoveForwardTwo6Times();
  turnRight();
  moveForward();
  turnRight();
  ligthAndMoveForwardTwo6Times();
}
