import { Lesson1Commands } from "../components/types";

export default function getProgram({
  moveForward, // Move's arrow forward in direction it is facing one square
  toggleOnOff // Turn arrow right (90 degrees clockwise)
}: Lesson1Commands) {
  // Call commands in order here.
  moveForward();
  moveForward();
  toggleOnOff();
}
