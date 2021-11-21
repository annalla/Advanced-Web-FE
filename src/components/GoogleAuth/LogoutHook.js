import { useGoogleLogout } from 'react-google-login';

const clientId =
    '318817895430-f6ck70ste47549mqi49f5m6vnum18sup.apps.googleusercontent.com';

function LogoutHooks() {
    const { signOut } = useGoogleLogout({
        clientId,
    });
    signOut();
    return null;
}

export default LogoutHooks;