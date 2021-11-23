import React, { Fragment } from "react";
import "./Nav2.css";
import Divider from "@mui/material/Divider";

import { AvatarIcon } from "./NavItems/Avatar";
import { MenuDrawer } from "./NavItems/Menu";
import { TabsItem } from "./NavItems/TabsItem";
import { useMemo } from "react";
import { useLocation } from "react-router";
import {PATH} from "../../constants/paths";
import {splitPath} from "../../utils/util"

let dict={}
function Nav2({data,valueTab}) {
  const location = useLocation();
  const id = splitPath(location.pathname, PATH.DETAIL_CLASS_SPLIT);
  const dataName=useMemo(()=>{
    if(id in dict){
      return dict[id]
    }
    return data.name;
  },[id,data.name])
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
                {data.name}OK{dataName}
                {/* <span className="code">{data.code}</span> */}
              </div>
            </div>
            <div className="tabs">
              <TabsItem value={valueTab} isCustom={data.isCustom} />
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
