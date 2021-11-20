import React, { Fragment } from "react";
import "./Nav2.css";
import Divider from "@mui/material/Divider";

import { AvatarIcon } from "./NavItems/Avatar";
import { MenuDrawer } from "./NavItems/Menu";
import { TabsItem } from "./NavItems/TabsItem";

function Nav2({data,valueTab}) {
  return (
    <Fragment>
      <header>
        <div className="header2">
          <div className="part1">
            <div className="logo2">
              <span>
                <MenuDrawer />
              </span>
              <div className="blockName2">
                {data.name}
                {/* <span className="code">{data.code}</span> */}
              </div>
            </div>
            <div className="tabs">
              <TabsItem value={valueTab} />
            </div>
          </div>

          <nav>
            <ul>
              <li>
                <AvatarIcon />
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Divider />
      <div className="divide"></div>
    </Fragment>
  );
}

export { Nav2 };
