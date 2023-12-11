import React, { ReactNode } from "react";
import { useEffect, useState, useCallback } from "react";

interface CenteredContainerProps {
  children: ReactNode;
}

function ProgressBar({ children }: any) {
  const [percent, __percent] = useState(0);
  const getProgress = useCallback(async () => {
    try {
      const response = await fetch(
        "https://eorc20.com/api/tickOpHistory/eoss/minted/progress"
      );
      const result = await response.json();
      const data = result.data;
      const mPercent = Number(((data.minted / data.mintMax) * 100).toFixed(2));
      if (mPercent < 100) {
        __percent(mPercent);
      } else {
        __percent(100.0);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }, []);
  useEffect(() => {
    getProgress();
  }, []);

  return (
    <div className="ProgressBar">
      <div className="wrapBar">
        <div className="percent" style={{ width: percent + "%" }}></div>
      </div>
      <div className="percentWord">{percent}%</div>
    </div>
  );
}

export default ProgressBar;
