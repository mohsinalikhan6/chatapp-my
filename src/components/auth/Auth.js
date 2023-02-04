import { GooglePlusOutlined } from '@ant-design/icons';
import { auth, provider } from '../firebase/FirebaseConfig';
import { signInWithPopup } from 'firebase/auth'
import { Button } from 'antd';
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export const Auth = (props) => {
    const { setIsAuth } = props;
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            cookies.set('auth-token', result.user.refreshToken);
            setIsAuth(true)
        } catch (err) {
            console.error(err)
        }
    };
    return (
        <div className='App-header'>
            <h1 className="text-3xl font-bold">Welcome to ChatApp</h1>

            {/* <div>Sign In With Google to Continue</div> */}
            {/* <Button onClick={signInWithGoogle}>SignIn With Google</Button> */}
            <div className='my-3.5'>
                <Button className='border-slate-400' onClick={signInWithGoogle} type="primary" size={'large'}><GooglePlusOutlined /> Sign in with Google
                </Button>
            </div>
        </div>
    )
}