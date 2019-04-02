import React from "react";

export interface IStatusBarProps {
  success: boolean;
  failure: boolean;
  running: boolean;
  directive: React.ReactNode;
}

const StatusBar = ({
  success,
  failure,
  running,
  directive
}: IStatusBarProps) => {
  let statusState: React.ReactNode = null;
  if (running) {
    statusState = <div className="statusState running">RUNNING</div>;
  } else if (success) {
    statusState = <div className="statusState success">SUCCESS</div>;
  } else if (failure) {
    statusState = <div className="statusState failure">FAILURE</div>;
  } else {
    statusState = <div className="statusState stopped">STOPPED</div>;
  }

  return (
    <div className="statusBar">
      <div className="directive">TASK: {directive}</div>
      {statusState}
    </div>
  );
};

export default StatusBar;
