import React, { ReactNode } from "react";
import { Pagination } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

interface CenteredContainerProps {
  children: ReactNode;
}

function MyAssets({ children }: any) {
  const assets: any = [{}, {}, {}, {}, {}];

  const [currentPage, setCurrentPage] = useState(1);
  const assetsPerPage = 10; // 每页显示的用户数量
  // 计算总页数
  const totalPages = Math.ceil(assets.length / assetsPerPage);

  // 处理页码变更
  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
  };
  return (
    <div className="MyAssets">
      <div className="assetsTitle">My Assets</div>
      <div className="assetsList">
        {assets.map((item: any, index: number) => {
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
      <div className="pageWrap">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
}

export default MyAssets;
