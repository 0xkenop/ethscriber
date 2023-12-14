"use client";
import React, { ReactNode } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
interface CenteredContainerProps {
  children: ReactNode;
}
import { MenuListConfig } from "./MenuListConfig";

export default function MenuPhone() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [pathName, __pathName] = useState("");
  useEffect(() => {
    const mPathName = window.location.pathname.replace("/", "");
    if (!mPathName) {
      __pathName("Mint");
    } else {
      __pathName(mPathName);
    }
  }, []);
  return (
    <div className="menuBarWrap">
      <Button
        id="fade-button"
        aria-controls={open ? "right" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img src="/images/bar.png" alt="Logo" className="menuBar" />
      </Button>

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {MenuListConfig.map(([text, href], index) => {
          return (
            <MenuItem onClick={handleClose} key={index}>
              <a href={href} target={"_self"}>
                <div className={`menuLi ${pathName == text ? "active" : ""}`}>
                  {text}
                </div>
              </a>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
