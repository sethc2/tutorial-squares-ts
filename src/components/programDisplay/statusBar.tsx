import React from "react";
const StatusBar = ({ success, failure, running, directive }) => {
  let statusState: React.ReactNode = null;
  if (running) {
    statusState = <div className="statusState running">RUNNING</div>;
  }
  if (success) {
    statusState = <div className="statusState success">SUCCESS</div>;
  }
  if (failure) {
    statusState = <div className="statusState failure">FAILURE</div>;
  }

  return (
    <div className="statusBar">
      <div className="directive">{directive}</div>
      {statusState}
    </div>
  );
};

export default StatusBar;
