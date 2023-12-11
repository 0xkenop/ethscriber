import React, { ReactNode } from "react";
import { Pagination } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
interface CenteredContainerProps {
  children: ReactNode;
}

function MyAssets({ children }: any) {
  const [assets, __assets] = useState([]);
  // const [encodedText, setEncodedText] = useState("data:,");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 20; // 每页显示的用户数量
  // 计算总页数
  const [totalPages, __totalPages] = useState(0);
  const [total, __total] = useState(0);
  const { address } = useAccount();

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
  const getAssets = useCallback(async () => {
    // debugger;
    const url = `https://eorc20.com/api/tickOpHistory/page?pageNumber=${currentPage}&pageSize=${pageSize}&fromAddress=${address}&tick=eoss&opType=2`;
    console.log(url, "url");
    try {
      const response = await fetch(url);

      const result = await response.json();
      const data = result.data;
      data.opList.forEach((item: any) => {
        item.opJson = item.opJson;
      });
      console.log(data.opList[0].id, "data.opList.length");
      const mAssets = data.opList;
      // debugger;
      __total(data.total);
      __totalPages(Math.ceil(data.total / pageSize));
      __assets(mAssets);
    } catch (error) {
      console.log("Error:", error);
    }
  }, [currentPage]);
  useEffect(() => {
    getAssets();
  }, [currentPage]);
  return (
    <div className="MyAssets">
      <div className="assetsTitle">My Assets</div>
      {total > 0 ? (
        <div className="assetsList">
          {assets.map((item: any, index: number) => {
            return (
              <div className="assetsLi" key={index}>
                {item.opJson}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
      {total > 0 ? (
        <div className="pageWrap">
          <Pagination
            count={totalPages}
            page={currentPage + 1}
            onChange={handlePageChange}
            color="primary"
          />
          <div className="totalSize">Total:{total}</div>
        </div>
      ) : (
        <div className="emptySize">Your inscrib EORC20 quantity: {total}</div>
      )}
    </div>
  );
}

export default MyAssets;
