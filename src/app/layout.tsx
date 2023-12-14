import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { ConnectButton } from "../components/ConnectButton";
import MenuList from "../components/MenuList";
import MenuPhone from "../components/MenuPhone";

import Image from "next/image";
import "../styles/styles.css";

export const metadata = {
  title: "EOS EORCscriber",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Analytics />

        <Providers>
          <div className="navBar">
            <div>
              <a href="/">
                <div className="logoWrap">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="logo"
                  />
                  EORC 20
                </div>
              </a>
            </div>
            {/* <MenuList></MenuList> */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ConnectButton />
              {/* <MenuPhone></MenuPhone> */}
            </div>
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
