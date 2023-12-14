"use client";
import CenteredContainer from "../components/CenteredContainer";
import ProgressBar from "../components/ProgressBar";
import MyAssets from "../components/MyAssets";

import { Ethscribe } from "../components/Ethscribe";
import { GithubButton } from "../components/GithubButton";
import MobileHidden from "../components/MobileHidden";
import Preloader from "../components/preloader/Preloader";
import Socials from "../components/Socials";
function Home() {
  return (
    <>
      <Preloader />

      <CenteredContainer>
        <ProgressBar percent={88.8} />
        <h2 className="scriberTitle">EOS EORCscriber</h2>
        <div className="scriberTitle1">A tool to inscrib EORC20</div>
        <Ethscribe />
        <MyAssets />
      </CenteredContainer>
      <Socials />
    </>
  );
}

export default Home;
