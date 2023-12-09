import React, { ReactNode } from "react";

interface CenteredContainerProps {
  children: ReactNode;
}

const CenteredContainer: React.FC<CenteredContainerProps> = ({ children }) => (
  <div className="centerWrap">{children}</div>
);

export default CenteredContainer;
