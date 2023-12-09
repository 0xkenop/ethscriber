import React, { ReactNode } from "react";

interface CenteredContainerProps {
  children: ReactNode;
}

const ProgressBar: React.FC<any> = ({ percent, children }: any) => (
  <div className="ProgressBar">
    <div className="wrapBar">
      <div className="percent" style={{ width: percent + "%" }}></div>
    </div>
    <div className="percentWord">{percent}%</div>
  </div>
);

export default ProgressBar;
