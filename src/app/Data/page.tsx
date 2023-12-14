"use client";
import CenteredContainer from "../../components/CenteredContainer";
import styles from "./page.module.css";
import Image from "next/image";
import { useCallback, useEffect, useState, useRef } from "react";
import { cutAddress, formatTimestamp } from "../../components/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useAccount } from "wagmi";

const tableTitleList = [
  "S/N",
  "Txn Hash",
  "Block",
  "Address",
  "Time",
  "eoss Amount",
];

export default function Data() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50; // 每页显示的用户数量
  // const { address } = useAccount();
  // 计算总页数
  const [totalPages, __totalPages] = useState(0);
  const [loading, __loading] = useState(false);
  const [total, __total] = useState(0);
  const [list, __list] = useState<any>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  // 处理页码变更

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
    console.log(value, "ssssssssss");
    getList(inputRef.current?.value, value);
  };
  const searchAddress = () => {
    if (inputRef.current) {
      getList(inputRef.current.value, currentPage);
    }
  };
  const getList = (fromAddress: string = "", mCurrentPage = 1) => {
    if (!fromAddress) {
      alert("Please enter the address you want to query");
      return;
    }
    if (loading) {
      alert("Please wait until loading is complete before searching");
      return;
    }
    __loading(true);
    __list([]);
    const url = `https://eorc20.com/api/tickOpHistory/page?pageNumber=${mCurrentPage}&pageSize=${pageSize}${
      fromAddress ? "&fromAddress=" + fromAddress : ""
    }`;
    fetch(url)
      .then((response) => {
        // 检查网络请求是否成功
        if (!response.ok) {
          alert("Network response was not ok");
        }
        // 将 JSON 转换为 JavaScript 对象
        return response.json();
      })
      .then((res: any) => {
        __loading(false);

        const data = res.data;
        __total(data.total);
        __totalPages(Math.ceil(data.total / pageSize));
        __list(data.opList);
      });
  };
  // useEffect(() => {
  //   // const res = {data: {"code":0,"data":{"records":[{"id":21000006,"blockNumber":38599318,"txid":"0xf022b7cafb7a5df512a15e5bda7b34cb3659bf6019c0e7b204ede77100eaa267","value":"50000000","index":0,"confirmed":0,"tick":"aval"}],"total":1,"size":20,"current":1,"orders":[],"optimizeCountSql":true,"hitCount":false,"countId":null,"maxLimit":null,"searchCount":true,"pages":1}}}
  //   getList();
  // }, []);
  return (
    <CenteredContainer>
      <div className={styles.commonTitle}>eoss Mint Transactions</div>
      <div className={styles.inputWrap}>
        <input
          type="text"
          placeholder="Input your eoss address"
          className={styles.input}
          ref={inputRef}
        />
        <div
          className={styles.searchBtn}
          onClick={() => {
            searchAddress();
          }}
        >
          <Image
            src="/images/search.png"
            alt="search"
            className={styles.img}
            width="30"
            height="30"
          />
        </div>
      </div>
      <div className={styles.tableWrap}>
        <Table
          sx={{
            minWidth: 650,
            ".css-1howxi1-MuiTableCell-root,.css-6qfsqn-MuiTableCell-root,.css-dsuxgy-MuiTableCell-root,.css-dv0mq-MuiTableCell-root,.css-12q85cb-MuiTableCell-root,.css-vtdehq-MuiTableCell-root":
              {
                borderBottom: "none",
                textTransform: "none",
              },
            ".css-vtdehq-MuiTableCell-root": {
              padding: { md: "6px 14px", xs: "6px 8px" },
            },
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {tableTitleList.map((item: string) => {
                return (
                  <TableCell align="center" key={item}>
                    <div className={styles.th}>{item}</div>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row: any) => (
              <TableRow
                key={row.mintNo}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <div className={styles.text}>{row.mintNo}</div>
                </TableCell>
                <TableCell align="center">
                  <div className={styles.text}>
                    <a
                      href={`https://explorer.evm.eosnetwork.com/tx/${row.txHash}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className={styles.link} title={row.txHash}>
                        {row.txHash}
                      </div>
                    </a>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className={styles.text}>{row.block}</div>
                </TableCell>
                <TableCell align="center">
                  <div className={styles.text} title={row.fromUser}>
                    {cutAddress(row.fromUser)}
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className={styles.text}>
                    {formatTimestamp(row.blockTime)}
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className={styles.text}>1</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {loading ? (
          <div className={styles.loading}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          ""
        )}
      </div>
      {total > 0 ? (
        <div className="pageWrap">
          <div className="totalSize">Total {total} eoss Mint Transactions</div>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      ) : (
        ""
      )}
    </CenteredContainer>
  );
}
