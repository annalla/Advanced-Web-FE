import React, { Fragment } from "react";
import "./Nav2.css";
// import { FormAdd } from '../Form/FormAdd';
// import { ButtonAdd } from './NavItems/ButtonAdd';
import Divider from "@mui/material/Divider";

import { AvatarIcon } from "./NavItems/Avatar";
import { MenuDrawer } from "./NavItems/Menu";
import { TabsItem } from "./NavItems/TabsItem";
import { Box } from "@mui/system";

function Nav2() {
  //set button Add
  //   const [isOpenAdd, setIsOpenAdd] = useState(false);
  return (
    <Fragment>
      <header>
        <div className="header2">
          <div className="part1">
            <div className="logo2">
              <span>
                <MenuDrawer />
              </span>
              <div className="blockName">
                <span>Cla sdjf skejf sjfd esjr sdjifh sdfh dsfhssName</span>
                <span className="code">MMH</span>
              </div>
            </div>
            <div className="tabs">
              <TabsItem value={0} />
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
      {/* {isOpenAdd ? <FormAdd onclose={() => setIsOpenAdd(false)} /> : ""} */}
    </Fragment>
  );
}

export { Nav2 };
