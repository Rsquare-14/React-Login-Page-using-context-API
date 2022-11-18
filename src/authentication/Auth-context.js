import React, { createContext } from "react";
import { useSetState } from "react-use";

export const AuthContext = createContext();

const initialState = {
    isLoggedIn: false,
    loginError: null
};

export const ContextProvider = (props) => {
    const [state, setState] = useSetState(initialState);

    const setLoginSuccess = (isLoggedIn) => setState({ isLoggedIn });
    const setLoginError = (loginError) => setState({ loginError });

    const login = (email, password) => {
        setLoginSuccess(false);
        setLoginError(null);

        fetchLogin(email, password, (error) => {
            if (!error) {
                setLoginSuccess(true);
            } else {
                setLoginError(error);
            }
        });

    };

    const logout = () => {
        setLoginSuccess(false);
        setLoginError(null);
    };

    return (
        <AuthContext.Provider
            value={{
                state,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

// checking login
const fetchLogin = (email, password, callback) => {
    console.log("email",email);
    if (email === "admin" && password === "admin") {
        console.log("correct");
        return callback(null);
    } else {
        console.log("not correct");
        return callback(new Error("Invalid email and password"));
    }
}
