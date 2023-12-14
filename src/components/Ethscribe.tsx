"use client";

import {
  useSendTransaction,
  useWaitForTransaction,
  useAccount,
  useChainId,
} from "wagmi";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { EthscriptionsAPI } from "../utils/ethscriptionsAPI";
import { identify, track } from "../utils/analytics";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { parseEther } from "viem";
export function Ethscribe() {
  const { data, error, isLoading, isError, sendTransaction } =
    useSendTransaction();

  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  const [showError, __showError] = useState(false);
  const [showSuccess, __showSuccess] = useState(false);
  useEffect(() => {
    if (isError) __showError(isError);
  }, [isError]);
  useEffect(() => {
    if (isSuccess) __showSuccess(isSuccess);
  }, [isSuccess]);
  const chainId = useChainId();

  const account = useAccount();

  const [text, setText] = useState(
    'data:,{"p":"eorc20","op":"mint","tick":"eoss","amt":"10000"}'
  );
  const [encodedText, setEncodedText] = useState("data:,");
  const [hex, setHex] = useState(Buffer.from(`${text}`).toString("hex"));

  const onCheckAvailability = useCallback(async () => {
    const api = new EthscriptionsAPI();
    const { ownerAddress, isTaken } = await api.checkAvailability(encodedText);

    track("checked_availability", { text });

    console.log("check availability", ownerAddress, isTaken);
    const message = isTaken
      ? `"${text}" text ethscription is already owned by ${ownerAddress}`
      : `"${text}" ethscription is available! Ethscribe it below`;
    alert(message);
  }, [encodedText, text]);

  const onEthscribe = useCallback(async () => {
    if (!account || !account.isConnected || !account.address) {
      alert(
        "You must connect your wallet to ethscribe, or copy the hex and send the transaction manually"
      );
      return;
    }

    track("ethscribed", { text, chainId, receiver: account.address });

    sendTransaction({
      to: account.address,
      data: `0x${hex}`,
    });
  }, [hex, account, sendTransaction, text, chainId]);

  useEffect(() => {
    if (!data?.hash) return;

    track("completed_ethscription", { txnHash: data?.hash, chainId });
  }, [data?.hash, chainId]);

  const onCopyHex = useCallback(() => {
    navigator.clipboard.writeText(hex);

    track("copied_hex", { text });

    // delay so dom stays focused
    setTimeout(() => {
      alert(`Copied hex to clipboard: ${hex}`);
    }, 250);
  }, [hex, text]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setText(text);
    setEncodedText(`data:,`);
    setHex(Buffer.from(`${text}`).toString("hex"));
  }, []);

  useEffect(() => {
    if (!account?.address) return;

    identify(account.address);
  }, [account.address]);

  return (
    <div className="ethscribe-container">
      <input
        autoFocus
        className="ethscribe-input"
        name="text"
        onChange={handleChange}
        value={text}
      />
      {/* <div className="ethscribe-encoded-text">{encodedText}</div> */}
      <input
        readOnly
        className="ethscribe-input"
        style={{ textAlign: "left" }}
        name="text"
        value={hex}
      />
      {chainId === 1 && (
        <button
          className="ethscribe-button"
          type="button"
          onClick={onCheckAvailability}
        >
          CHECK AVAILABILITY
        </button>
      )}
      <button className="ethscribe-button" type="button" onClick={onCopyHex}>
        COPY HEX
      </button>
      <button className="ethscribe-button" type="button" onClick={onEthscribe}>
        EORCSCRIBER
      </button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={showError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        sx={{ width: "350px" }}
        onClose={() => __showError(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error: {error?.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={4000}
        onClose={() => __showSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Success!
        </Alert>
      </Snackbar>
      {/* {isLoading && <div className="ethscribe-message">Check wallet...</div>} */}
      {/* {isPending && (
        <div className="ethscribe-message">Transaction pending...</div>
      )} */}

      {/* {isSuccess && (
        <>
          <div className="ethscribe-message">
            Success!{" "}
            <a href={`https://etherscan.io/tx/${data?.hash}`}>View Txn</a>{" "}
            <a href={`https://ethscriptions.com/${account?.address}`}>
              View your Ethscriptions
            </a>
          </div>
        </>
      )} */}
      {/* {isError && (
        <div className="ethscribe-message">Error: {error?.message}</div>
      )} */}
    </div>
  );
}
