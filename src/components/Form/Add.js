import { PATH } from '../../constants/paths'
import { useNavigate } from 'react-router';
const Header = () => {
    const navigate = useNavigate()
    return (
        navigate(PATH.HOME)
    )
};
export { Header };