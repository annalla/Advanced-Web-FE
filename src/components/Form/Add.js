import React from 'react';
import { Redirect } from 'react-router-dom';
import {PATH} from '../../constants/paths'
const Header = () => {
    return (
        <div>
            <Redirect to={PATH.HOME}/>
        </div>
    )
};
export { Header } ;