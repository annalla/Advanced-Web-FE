import React, { useState, Fragment } from 'react';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

import { AvatarIcon } from './NavItems/Avatar';
import { MenuDrawer } from './NavItems/Menu';
import { FormAdd } from '../Form/FormAdd';
import { ButtonAdd } from './NavItems/ButtonAdd';
import './Nav.css';



function Nav() {
  //set button Add
  const [isOpenAdd, setIsOpenAdd] = useState(false); 
  return (
    <Fragment>
      <header >
        <div className="header">
          <div className="logo">
            <span>
              <MenuDrawer/>
            </span>
            <div className="name">Classroom</div>
          </div>
          <nav>
            <ul>
              <li>
                <ButtonAdd onOpen={() => setIsOpenAdd(true)}></ButtonAdd>
              </li>
              <li>
               <AvatarIcon/>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Divider/>
      <div className="divide">
      </div>
      {isOpenAdd ? <FormAdd onclose={() => setIsOpenAdd(false)} /> : ""}
    </Fragment>
  );
}

export { Nav };