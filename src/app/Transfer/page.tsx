"use client";
import { useSendTransaction, useAccount, useConnect } from "wagmi";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
// import Web3 from "web3";
import BigNumber from "bignumber.js";
import { parseEther, toHex } from "viem";
import { InjectedConnector } from "wagmi/connectors/injected";
import CenteredContainer from "../../components/CenteredContainer";
const TransferPage = () => {
  const { data, error, isLoading, isError, sendTransaction } =
    useSendTransaction();
  // const { address, web3, connect } = useEth();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  // const { address } = { address: '0xe28b3058a2f7f251741a7289b633a902126260ea' }
  const [list, setList] = useState<
    {
      txid: string;
      index: number;
      value: string;
      tick: string;
      select: boolean;
    }[]
  >([]);
  useEffect(() => {
    if (address) {
      // const res = {data: {"code":0,"data":{"records":[{"id":21000006,"blockNumber":38599318,"txid":"0xf022b7cafb7a5df512a15e5bda7b34cb3659bf6019c0e7b204ede77100eaa267","value":"50000000","index":0,"confirmed":0,"tick":"aval"}],"total":1,"size":20,"current":1,"orders":[],"optimizeCountSql":true,"hitCount":false,"countId":null,"maxLimit":null,"searchCount":true,"pages":1}}}
      fetch("https://api.example.com/data").then((res: any) => {
        if (res.data.data) {
          // console.log('res::', res.data.data.records)
          const list = res.data.data.records;
          setList(
            list.map((e: any) => {
              return {
                ...e,
                select: false,
              };
            })
          );
        }
      });
    }
  }, [address]);
  const select_value = list
    .filter((e) => e.select)
    .map((e) => e.value)
    .reduce((a, b) => BigNumber(a).plus(b), BigNumber(0));
  const disabled = !select_value.isGreaterThan(0);
  const [receiver, setReceiver] = useState("");
  const [amt, setAmt] = useState("");
  return (
    <CenteredContainer>
      <div className={styles.transfer}>
        <div className={styles.transferInner}>
          <div className={styles.title}>Tick</div>
          <div>
            <input type="text" value="Eoss" className={styles.input} disabled />
          </div>
          <div className={styles.title}>Select UTXO</div>
          <div className={styles.utxos}>
            {address && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div
                    style={{ marginBottom: "5px", color: "rgba(0,0,0,0.5)" }}
                  >
                    Top 500utxo
                  </div>
                  <div
                    style={{ marginBottom: "20px", color: "rgba(0,0,0,0.5)" }}
                  >
                    Select value: {select_value.toFormat(4)}
                  </div>
                </div>
                <div>
                  <div
                    className={styles.all}
                    onClick={() => {
                      setList((list) =>
                        list.map((e) => ({ ...e, select: true }))
                      );
                    }}
                  >
                    All
                  </div>
                </div>
              </div>
            )}
            {list.map((item, index) => {
              return (
                <>
                  <div
                    className={[
                      styles.utxo_item,
                      item.select ? styles.utxo_select : "",
                    ].join(" ")}
                    onClick={() => {
                      setList((list) => {
                        return list.map((utxo, _index) => {
                          return {
                            ...utxo,
                            select:
                              _index === index ? !utxo.select : utxo.select,
                          };
                        });
                      });
                    }}
                  >
                    ${item.tick}: {item.value}
                  </div>
                </>
              );
            })}
            {list.length === 0 && (
              <>
                {address ? (
                  <div
                    style={{
                      fontSize: 20,
                      textAlign: "center",
                      padding: "10px 0px",
                      color: "rgba(0,0,0,0.5)",
                    }}
                  >
                    NO UTXO
                  </div>
                ) : (
                  <div onClick={() => connect} className={styles.connect}>
                    {"Connect"}
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles.title}>Receiver</div>
          <input
            value={receiver}
            placeholder="0x..."
            className={styles.input}
            onInput={(e) => {
              setReceiver((e.target as any).value);
            }}
          />
          <div className={styles.title}>
            Amount <span style={{ opacity: 0.6 }}>(transfer token number)</span>
          </div>
          <input
            value={amt}
            onInput={(e) => {
              setAmt((e.target as any).value);
            }}
            className={styles.input}
            placeholder="0"
            type="number"
          />
          <div style={{ marginTop: 50 }}>
            <button
              disabled={disabled}
              onClick={async () => {
                console.log("amt::", amt);
                if (!receiver) {
                  alert("receiver error");
                  return;
                }
                if (!isEthAddressValid(receiver || "")) {
                  alert("receiver error");
                  return;
                }
                if (!amt || BigNumber(amt).isLessThanOrEqualTo(0)) {
                  alert("amt error");
                  return;
                }
                const vin: { txid: string; vout: string }[] = list.map((e) => {
                  return {
                    txid: e.txid,
                    vout: e.index.toString(),
                  };
                });
                const dataString =
                  "data:," +
                  JSON.stringify({
                    p: "eorc20",
                    op: "transfer",
                    tick: "",
                    vin: vin,
                    vout: [
                      {
                        amt: amt,
                        scriptPubKey: { addr: receiver.toLocaleLowerCase() },
                      },
                    ],
                  });

                console.log(dataString);
                // if(web3){
                try {
                  const sender = address;
                  console.log("sender", sender);
                  const value = parseEther("0");
                  const hex = toHex(dataString);
                  console.log(data);

                  const tx = sendTransaction({
                    to: "0x0000000000000000000000000000000000000000",
                    value: value,
                    data: `0x${hex}`,
                  });
                  alert("success");
                } catch (error) {
                  console.log(error);
                }
                // }
              }}
            >
              Transfer
            </button>
          </div>
          {/* <div>{error}</div> */}
        </div>
        <div style={{ height: "50px" }}></div>
      </div>
    </CenteredContainer>
  );
};

export default TransferPage;

function isEthAddressValid(address: string) {
  if (typeof address !== "string") {
    return false;
  }

  if (!/^0x[0-9A-Fa-f]{40}$/.test(address)) {
    return false;
  }

  return true;
}
