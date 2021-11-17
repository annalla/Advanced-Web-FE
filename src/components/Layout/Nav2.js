import React, { Fragment } from 'react';
import './Nav.css';
// import { FormAdd } from '../Form/FormAdd';
// import { ButtonAdd } from './NavItems/ButtonAdd';
import Divider from '@mui/material/Divider';

import { AvatarIcon } from './NavItems/Avatar';
import { MenuDrawer } from './NavItems/Menu';
import {TabsItem} from './NavItems/TabsItem';


function Nav2() {
  //set button Add
//   const [isOpenAdd, setIsOpenAdd] = useState(false); 
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
          <div className='tabs'>
            <TabsItem/>
          </div>
          <nav>
            <ul>
              {/* <li>
                <ButtonAdd onOpen={() => setIsOpenAdd(true)}></ButtonAdd>
              </li> */}
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
      {/* {isOpenAdd ? <FormAdd onclose={() => setIsOpenAdd(false)} /> : ""} */}
    </Fragment>
  );
}

export { Nav2 };