import React from "react";
import Grid from "./grid";
import Arrow from "./arrow";
import StatusBar from "./statusBar";
import Controls from "./controls";
import "./index.css";

const ProgramDisplay = ({
  cellSize,
  gridHeight,
  gridWidth,
  squares,
  time,
  setTime,
  arrowDirection,
  arrowX,
  arrowY,
  start,
  reset,
  lessonNumber,
  setLessonNumber,
  success,
  failure,
  lessons,
  commands,
  commandIndex
}) => {
  return (
    <div className="mainContainer">
      <div>
        <StatusBar
          success={success}
          failure={failure}
          running={!start && !success && !failure}
          directive={directive}
        />
        <Controls
          start={start}
          reset={reset}
          lessonNumber={lessonNumber}
          setLessonNumber={setLessonNumber}
          setTime={setTime}
          time={time}
          lessons={lessons}
        />
      </div>
      <div>
        <ul>
          {commands.map((x, index) => (
            <li
              key={index}
              style={{ color: index === commandIndex ? "blue" : "black" }}
            >
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className="gridAndArrowContainer">
        <div className="gridAndArrowHelper" />
        <div
          className="gridAndArrowInnerContainer"
          style={{ height: gridHeight * cellSize, width: gridWidth * cellSize }}
        >
          <Grid squares={squares} cellSize={cellSize} />
          <Arrow
            arrowX={arrowX}
            arrowY={arrowY}
            cellSize={cellSize}
            time={time}
            arrowDirection={arrowDirection}
          />
        </div>
        <div className="gridAndArrowHelper" />
      </div>
    </div>
  );
};

export default ProgramDisplay;
