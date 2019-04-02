import React from "react";

const Grid = ({ squares, cellSize }: any) => {
  return (
    <React.Fragment>
      {squares.map(({ x, y, color, value }: any, index: number) => {
        return (
          <div
            className="square"
            key={index}
            style={{
              top: y * cellSize,
              left: x * cellSize,
              width: cellSize,
              height: cellSize,
              background: color
            }}
          >
            {value ? value : null}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Grid;
