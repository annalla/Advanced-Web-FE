import { useGoogleLogout } from 'react-google-login';

const clientId =
    '318817895430-t92c9mfh6hg2qe4io5196o55jvr82k47.apps.googleusercontent.com';

function LogoutHooks() {
    const { signOut } = useGoogleLogout({
        clientId,
    });
    signOut();
    return null;
}

export default LogoutHooks;