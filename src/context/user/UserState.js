import { useState } from "react";
import UserContext from "./userContext";

const UserState = (props)=>{
    const baseUrl = "http://localhost:5000"

    const login = async (email, password)=>{
        const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  
            },
            body: JSON.stringify({email, password}),
        });
        const json = await response.json();
        return json;
    }

    const signup = async (name, email, password)=>{
        const response = await fetch(`${baseUrl}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  
            },
            body: JSON.stringify({name, email, password}),
        });
        const json = await response.json();
        return json;
    }
    return (
        <UserContext.Provider value={{login, signup}}>
            {props.children}
         </UserContext.Provider>
    )
}
 
export default UserState;