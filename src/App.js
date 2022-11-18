import React, {useContext} from "react";
import { AuthContext } from './authentication/Auth-context';
import Login from './loginPage/Login';
import HomePage from './homePage/HomePage';

const App = () => {
  const { state } = useContext(AuthContext);
  if (!state.isLoggedIn) 
    return <Login />;
  else
    return <HomePage />
}

export default App;