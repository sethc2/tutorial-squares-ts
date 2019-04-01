import React from "react";

const Controls = ({
  start,
  reset,
  lessonNumber,
  setLessonNumber,
  setTime,
  time,
  lessons
}) => {
  return (
    <div className='controlsContainer'>
      <div className='startReset'>
        <button className='startProgram' disabled={!start} onClick={start}>
          Start
        </button>
        <button className='resetProgram' disabled={!reset} onClick={reset}>
          Reset
        </button>
      </div>
      <div className='lessonSelector'>
        <span>Select Lesson: </span>
        {lessons.map(lesson => (
          <button
            key={lesson}
            onClick={() => setLessonNumber(lesson)}
            style={lesson === lessonNumber ? { color: "blue" } : undefined}
          >
            {lesson}
          </button>
        ))}
      </div>
      <div className='time'>
        <label>Time between commands (ms): </label>
        <input
          value={time}
          onChange={e => setTime(e.target.value)}
          type='number'
        />
      </div>
    </div>
  );
};

export default Controls;
