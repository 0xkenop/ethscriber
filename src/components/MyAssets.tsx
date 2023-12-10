import React, { ReactNode } from "react";

interface CenteredContainerProps {
  children: ReactNode;
}
const assetsLi: any = [{}, {}, {}, {}, {}];

const MyAssets: React.FC<any> = ({ children }: any) => (
  <div className="MyAssets">
    <div className="assetsTitle">My Assets</div>
    <div className="assetsList">
      {assetsLi.map((item: any, index: number) => {
        return (
          <div className="assetsLi" key={index}>{`{
     "p":"eorc20",
     "op":"mint",
     "tick":"eoss",
     "amt":"10000"
}`}</div>
        );
      })}
    </div>
  </div>
);

export default MyAssets;
