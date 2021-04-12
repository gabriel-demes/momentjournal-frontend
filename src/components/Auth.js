import React, {useState} from "react"
import Login from "./Login"
import Signup from "./Signup"

const Auth = ({setUser}) => {
    const [auth, setAuth] = useState(true)
    const handleClick = () => setAuth(auth => !auth)
    return(
        <div>
            <button onClick={handleClick}>{auth ? "Login" : "SignUp"}</button>
            {auth ? <Signup setUser={setUser}/> : <Login setUser={setUser}/>}
        </div>
    )
}

export default Auth
