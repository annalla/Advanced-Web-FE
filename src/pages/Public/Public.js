import React from 'react';
import {PATH} from '../../constants/paths'
import { useNavigate } from 'react-router';
const Public = () => {
    const navigate=useNavigate()
    return (
        navigate(PATH.LOGIN)
    )
};
export { Public } ;