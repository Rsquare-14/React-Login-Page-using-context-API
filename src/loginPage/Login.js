import React, { useContext } from 'react';
import { useSetState } from 'react-use';
import { AuthContext } from '../authentication/Auth-context';
import "./login.css"

const initialState = {
    email: '',
    password: ''
}

const LoginForm = () => {

    const ContextState = useContext(AuthContext);

    const [state, setState] = useSetState(initialState);

    const onSubmit = (e) => {
        console.log("submitted");
        e.preventDefault();
        const { email, password } = state;
        ContextState.login(email, password);
        setState({
            email: '',
            password: ''
        });
    }

    return (
        <div id="loginform">
            <h2 id="headerTitle">DataBeat Login !</h2>
            <div>
                <div className="row">
                    <label>UserName</label>
                    <input type="text" placeholder="admin" onChange={(e) => setState({ email: e.target.value })} />
                </div>
                <div className="row">
                    <label>Password</label>
                    <input type="password" placeholder="admin" onChange={(e) => setState({ password: e.target.value })} />
                </div>
                <div id="button" className="row">
                    <button type='submit' onClick={onSubmit}>Log in</button>
                </div>
            </div>
            <div className='login-msg'>
                {ContextState.state.isLoggedIn && <div>Success.</div>}
                {ContextState.state.loginError && <div className='login-error'>{ContextState.state.loginError.message}</div>}
            </div>
        </div>
    )
}


export default LoginForm;