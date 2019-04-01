import React from "react";
import { IArrowState } from "../types";

export interface IArrowProps {
  arrowState: IArrowState;
  time: number;
  cellSize: number;
}

function getDegreesForDirection(direction: IArrowState["direction"]) {
  switch (direction) {
    case "down":
      return 180;
    case "up":
      return 0;
    case "left":
      return 270;
    case "right":
      return 90;
  }
}

const Arrow: React.FunctionComponent<IArrowProps> = ({
  arrowState: { x, y, direction },
  time,
  cellSize
}) => {
  return (
    <div
      className="arrow"
      style={{
        width: cellSize + 1,
        height: cellSize + 1,
        left: x * cellSize,
        top: y * cellSize,
        transition: `all ${time}ms ease-in-out`,
        transform: `rotate(${getDegreesForDirection(direction)}deg)`
      }}
    >
      <svg height={cellSize} width={cellSize} viewBox="0 0 500 500">
        <polygon points="250,60 100,400 400,400" />
      </svg>
    </div>
  );
};

export default Arrow;
