'use client';
import CenteredContainer from "../components/CenteredContainer";
import { ConnectButton } from "../components/ConnectButton";
import ProgressBar from "../components/ProgressBar";
import MyAssets from "../components/MyAssets";

import { Ethscribe } from "../components/Ethscribe";
import { GithubButton } from "../components/GithubButton";
import { Logo } from "../components/Logo";
import MobileHidden from "../components/MobileHidden";
import Preloader from "../components/preloader/Preloader";
import Socials from "../components/Socials";
import "../styles/styles.css";
import Decimal from "decimal.js";
import { useEffect, useState } from "react";

function Home() {
  const [t1, setT1] = useState("0")
  useEffect(() => {
    fetch("https://eorc20.com/api/tickOpHistory/eoss/minted/progress")
      .then(res => res.json().then(res => {
        const {mintMax, minted} = res?.data
        setT1(new Decimal(minted).div(new Decimal(mintMax)).mul(new Decimal(100)).toFixed(2))
      }))
  }, [])

  return (
    <>
      <Preloader />
      <div className="navBar">
        <div>
          <Logo />
          <div style={{ marginLeft: 10 }} />
          {/* <MobileHidden>
          <GithubButton />
        </MobileHidden> */}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ConnectButton />
        </div>
      </div>
      <CenteredContainer>
        <ProgressBar percent={t1} />
        <h2 className="scriberTitle">EOS EORCscriber</h2>
        <div className="scriberTitle1">A tool to inscribe EORC20</div>
        <Ethscribe />
        <MyAssets />
      </CenteredContainer>
      <Socials />
    </>
  );
}

export default Home;
