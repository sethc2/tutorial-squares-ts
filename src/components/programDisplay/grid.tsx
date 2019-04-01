import React from "react";

const Grid = ({ squares, cellSize }) => {
  return (
    <React.Fragment>
      {squares.map(({ x, y, isLit, isLightable }, index) => {
        return (
          <div
            className='square'
            key={index}
            style={{
              top: y * cellSize,
              left: x * cellSize,
              width: cellSize,
              height: cellSize,
              background: !isLightable
                ? "lightgrey"
                : isLit
                ? "yellow"
                : "lightblue"
            }}
          />
        );
      })}
    </React.Fragment>
  );
};

export default Grid;
