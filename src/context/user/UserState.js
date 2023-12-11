import UserContext from "./userContext";
import axios from "axios";



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
        let res;
        await axios.post(`${baseUrl}/api/auth/createuser`, {
            "name": name,
            "email": email,
            "password": password
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            res = response;
        })
        .catch(error => {
            res = error.response;
        });
        return res;
    }
    return (
        <UserContext.Provider value={{login, signup}}>
            {props.children}
         </UserContext.Provider>
    )
}
 
export default UserState;