import React from "react";
import Grid from "./grid";
import Arrow from "./arrow";
import StatusBar from "./statusBar";
import Controls from "./controls";
import "./index.css";
import { IArrowState, IGridState } from "../types";
import lessons from "../../lessons";

export interface IProgramDisplayProps {
  arrowState: IArrowState;
  gridState: IGridState;
  directive: React.ReactNode;
  cellSize: number;
  start: (() => void) | null;
  reset: (() => void) | null;
  lessonNumber: keyof typeof lessons;
  setLessonNumber: (value: keyof typeof lessons) => void;
  success: boolean | null;
  failure: boolean;
  commands: string[];
  commandIndex: number;
  time: number;
  setTime: (time: number) => void;
}

const ProgramDisplay = ({
  arrowState,
  gridState,
  directive,
  cellSize,
  start,
  reset,
  lessonNumber,
  setLessonNumber,
  success,
  failure,
  commands,
  commandIndex,
  time,
  setTime
}: IProgramDisplayProps) => {
  return (
    <div className="mainContainer">
      <div>
        <StatusBar
          success={success || false}
          failure={failure}
          running={!start && !success && !failure}
          directive={directive}
        />
        <Controls
          cellSize={cellSize}
          start={start}
          reset={reset}
          lessonNumber={lessonNumber}
          setLessonNumber={setLessonNumber}
          setTime={setTime}
          time={time}
        />
      </div>
      <div>
        <ol>
          {commands.map((x: string, index: number) => (
            <li
              key={index}
              style={{ color: index === commandIndex ? "blue" : "black" }}
            >
              {x || "INITIAL"}
            </li>
          ))}
        </ol>
      </div>
      <div className="gridAndArrowContainer">
        <div className="gridAndArrowHelper" />
        <div
          className="gridAndArrowInnerContainer"
          style={{
            height: gridState.height * cellSize,
            width: gridState.width * cellSize
          }}
        >
          <Grid squares={gridState.squares} cellSize={cellSize} />
          <Arrow arrowState={arrowState} cellSize={cellSize} time={time} />
        </div>
        <div className="gridAndArrowHelper" />
      </div>
    </div>
  );
};

export default ProgramDisplay;
