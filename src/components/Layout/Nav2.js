import React, { Fragment, useState } from "react";
import "./Nav2.css";
import Divider from "@mui/material/Divider";
import { FiSettings } from 'react-icons/fi';

import { AvatarIcon } from "./NavItems/Avatar";
import { MenuDrawer } from "./NavItems/Menu";
import { TabsItem } from "./NavItems/TabsItem";
import { ClassSetting } from "../ClassSetting/ClassSetting";

function Nav2({ data, valueTab }) {
    const [isOpenSetting, setIsOpenSetting] = useState(false); 
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
                            <TabsItem value={valueTab} isCustom={data.isCustom} />
                        </div>
                    </div>
                    <div onClick={() => setIsOpenSetting(true)}>
                    <FiSettings id="settingIcon" />
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
            {isOpenSetting ? <ClassSetting onclose={() => setIsOpenSetting(false)} /> : ""}
        </Fragment>
    );
}

export { Nav2 };
