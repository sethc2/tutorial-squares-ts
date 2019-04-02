import React, { useState } from "react";
import "./App.css";
import ProgramDisplay from "./components/programDisplay";
import { useProgram } from "./useProgram";
import lessons from "./lessons";
import programs from "./programs";

const cellSize = 20;

let defaultLessonNumber =
  (window.localStorage.getItem("lessonNumber") as keyof typeof lessons) ||
  "one";
if (!lessons[defaultLessonNumber]) {
  defaultLessonNumber = "one";
}

let defaultTime = window.localStorage.getItem("time") || "50";
const App = () => {
  const [lessonNumber, setLessonNumber] = useState(
    defaultLessonNumber as keyof typeof lessons
  );
  const [time, setTime] = useState(parseInt(defaultTime));
  const {
    programState,
    reset,
    start,
    success,
    failure,
    commands,
    commandIndex
  } = useProgram({
    getProgram: programs[lessonNumber],
    lesson: lessons[lessonNumber],
    timeBetweenCommands: time
  });

  if (!programState) {
    return null;
  }

  const { arrowState, gridState } = programState;

  return (
    <div className="App">
      <ProgramDisplay
        arrowState={arrowState}
        gridState={gridState}
        cellSize={cellSize}
        commandIndex={commandIndex}
        commands={commands}
        directive={lessons[lessonNumber].directive}
        failure={failure}
        lessonNumber={lessonNumber}
        reset={reset}
        setLessonNumber={lessonNumber => {
          window.localStorage.setItem("lessonNumber", lessonNumber.toString());
          setLessonNumber(lessonNumber);
        }}
        setTime={time => {
          window.localStorage.setItem("time", time.toString());
          setTime(time);
        }}
        start={start}
        success={success}
        time={time}
      />
    </div>
  );
};

export default App;
