"use client";
import React, { ReactNode } from "react";
import { MenuListConfig } from "./MenuListConfig";
import { useEffect, useState } from "react";
interface CenteredContainerProps {
  children: ReactNode;
}

function MenuList({ children }: any) {
  const [pathName, __pathName] = useState("");
  useEffect(() => {
    const mPathName = window.location.pathname.replace("/", "");
    if (!mPathName) {
      __pathName("Mint");
    } else {
      __pathName(mPathName);
    }

    console.log(window.location.pathname, 7878);
  }, []);
  return (
    <div className="menuList">
      {MenuListConfig.map(([text, href], index) => {
        return (
          <a key={index} href={href} target={"_self"}>
            <div className={`menuLi ${pathName == text ? "active" : ""}`}>
              {text}
            </div>
          </a>
        );
      })}
    </div>
  );
}

export default MenuList;
