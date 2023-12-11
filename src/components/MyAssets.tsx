import React, { ReactNode } from "react";
import { Pagination } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface CenteredContainerProps {
  children: ReactNode;
}

function MyAssets({ children }: any) {
  const [assets, setAssets] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const assetsPerPage = 10; // 每页显示的用户数量
  // 计算总页数
  const [totalPages, setTotalPages] = useState(1)

  const { isConnected } = useAccount();

  const account = useAccount();
  useEffect(() => {
    if (isConnected) {
      if (account.address !== undefined) {
        fetch(`https://eorc20.com/api/tickOpHistory/page?pageNumber=1&pageSize=${assetsPerPage}&fromAddress=${account.address}&tick=eoss&opType=mint`).then(res => {
          console.log(res)
          res.json().then(res => {
            console.log(res)
            const {total, opList} = res?.data
            console.log(opList)
            setAssets(opList)
            setTotalPages(Math.ceil(total / assetsPerPage))
          })
        })
      }
    }
  },[])
  
  // 处理页码变更
  const handlePageChange = (event: any, value: any) => {
    if (isConnected) {
      if (account.address !== undefined) {
        console.log(event, value)
        fetch(`https://eorc20.com/api/tickOpHistory/page?pageNumber=${value}&pageSize=${assetsPerPage}&fromAddress=${account.address}&tick=eoss&opType=mint`).then(res => {
          res.json().then(res => {
            const {total, opList} = res?.data
            console.log(opList)
            setAssets(opList)
            setTotalPages(Math.ceil(total / assetsPerPage))
          })
        })
      }
    }
    setCurrentPage(value);
  };
  return (
    <div className="MyAssets">
      <div className="assetsTitle">My Assets</div>
      <div className="assetsList">
        {assets.map((item: any, index: number) => {
          return (
            <div className="assetsLi" key={index}>
              {
                item?.opJson
              }
            </div>
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
