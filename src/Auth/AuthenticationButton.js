import React, {useContext} from "react";
import {UserContext} from "../context/user-context";
import LoginButton from "./Login";
import LogoutButton from "./Logout";


const AuthenticationButton = () => {

  const {user} = useContext(UserContext);

  return user ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;