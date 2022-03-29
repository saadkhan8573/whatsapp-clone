import React from 'react'
import { Button } from '@material-ui/core'
import './login.css'
import { auth, provider } from '../../firebase';
import { useStateValue } from '../stateprovider/StateProvider';
import { actionTypes } from '../stateprovider/Reducer';

const Login = () => {
    const [{  }, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            console.log(result)
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            });

        }).catch((err) => {
            alert(err)
        });
    }
    return (
        <>
            <div className="login">
                <div className="login_container">
                    <img src="../images/whatsapp.png" alt="Whatsapp Logo" />
                    <div className="login_text">
                        <h1>Sign in to Whatsapp</h1>
                    </div>

                    <Button onClick={signIn}>
                        Sign in with Google
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Login
