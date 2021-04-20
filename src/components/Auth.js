import { Button, ButtonGroup, makeStyles } from "@material-ui/core"
import React, {useState} from "react"
import Login from "./Login"
import Signup from "./Signup"

const Auth = ({setUser}) => {
    const [auth, setAuth] = useState(true)

    const loginStyle = makeStyles(theme => ({
        root:{
            backgroundColor: !auth ? "rgb(0 76 104)" : null,
            color: !auth ? "white" : null,
            fontFamily: "Kalam"
        }
    }))

    const signupStlye = makeStyles(theme => ({
        root:{
            backgroundColor: auth ? "rgb(0 76 104)" : null,
            color: auth ? "white" : null,
            fontFamily: "Kalam"
        }
    }))

    const loginClass = loginStyle()
    const signupClass = signupStlye()
    return(
        <div style={{marginTop:"2em"}}>
            <ButtonGroup>
                <Button className={signupClass.root} onClick={()=> setAuth(true)}>SignUp</Button>
                <Button className={loginClass.root} onClick={()=> setAuth(false)}>LogIn</Button>
            </ButtonGroup>
            {auth ? <Signup setUser={setUser}/> : <Login setUser={setUser}/>}
        </div>
    )
}

export default Auth
