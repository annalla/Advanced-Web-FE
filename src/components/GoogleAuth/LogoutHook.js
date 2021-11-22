import { useGoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID

function LogoutHooks() {
    const { signOut } = useGoogleLogout({
        clientId,
    });
    signOut();
    return null;
}

export default LogoutHooks;