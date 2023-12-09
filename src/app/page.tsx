import CenteredContainer from '../components/CenteredContainer';
import { ConnectButton } from '../components/ConnectButton';
import { Ethscribe } from '../components/Ethscribe';
import { GithubButton } from '../components/GithubButton';
import { Logo } from '../components/Logo';
import MobileHidden from '../components/MobileHidden';
import Preloader from '../components/preloader/Preloader';
import Socials from '../components/Socials';

function Home() {
  return (
    <>
      <Preloader />
      <div
        style={{
          position: 'fixed',
          top: 10,
          left: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
        }}
      >
        <Logo />
        <div style={{ marginLeft: 10 }} />
        {/* <MobileHidden>
          <GithubButton />
        </MobileHidden> */}
      </div>
      <div
        style={{
          position: 'fixed',
          top: 10,
          right: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
        }}
      >
        <ConnectButton />
      </div>
      <CenteredContainer>
        <h2 style={{ fontFamily: 'monospace' }}>EOS EORCscriber</h2>
        <div
          style={{
            fontFamily: 'monospace',
            marginBottom: 25,
            textAlign: 'center',
          }}
        >
           A tool to inscrib EORC20
        </div>
        <Ethscribe />
      </CenteredContainer>
      <Socials />
    </>
  );
}

export default Home;
