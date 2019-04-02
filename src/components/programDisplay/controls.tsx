import React from "react";
import lessons from "../../lessons";

export interface IControlsProps {
  cellSize: number;
  start: (() => void) | null;
  reset: (() => void) | null;
  lessonNumber: keyof typeof lessons;
  setLessonNumber: (value: keyof typeof lessons) => void;
  time: number;
  setTime: (time: number) => void;
}

const Controls: React.FunctionComponent<IControlsProps> = ({
  start,
  reset,
  lessonNumber,
  setLessonNumber,
  setTime,
  time
}) => {
  return (
    <div className="controlsContainer">
      <div className="startReset">
        {!start ? null : (
          <button className="startProgram" disabled={!start} onClick={start}>
            Start
          </button>
        )}
        {!reset ? null : (
          <button className="resetProgram" disabled={!reset} onClick={reset}>
            Reset
          </button>
        )}
      </div>
      <div className="lessonSelector">
        <span>Select Lesson: </span>
        {Object.keys(lessons).map(key => (
          <button
            key={key}
            onClick={() => setLessonNumber(key as keyof typeof lessons)}
            style={key === lessonNumber ? { color: "blue" } : undefined}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="time">
        <label>Time between commands (ms): </label>
        <input
          value={time}
          onChange={e => setTime(parseInt(e.target.value) || 50)}
          type="number"
        />
      </div>
    </div>
  );
};

export default Controls;
