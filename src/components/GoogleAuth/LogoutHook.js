import { useGoogleLogout } from 'react-google-login';
import { GOOGLE_LOGIN_CLIENT_ID } from '../../constants/const';

const clientId = GOOGLE_LOGIN_CLIENT_ID

function LogoutHooks() {
    const { signOut } = useGoogleLogout({
        clientId,
    });
    signOut();
    return null;
}

export default LogoutHooks;