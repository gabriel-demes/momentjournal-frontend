import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";

const Login = ({setUser}) => {

    const history = useHistory()
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({username:"", password:""})
    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3000/login`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(r=> {
            return r.json().then(data => {
                if (r.ok) {
                    return data
                } else {
                    throw data
                }
            })})
            .then(data => {
                const {user, token} = data;
                localStorage.setItem("token", token);
                setUser(user);
                history.push("/dashboard");
            })
            .catch(data => {
                setErrors(data.errors)
            })
            
    }
    return (
        <form onSubmit={handleSubmit} autoComplete="off" id="login-form">
            {errors.map(err => <p key={err}>{err}</p>)}
            <h1>Login</h1>
            <div className="login-control">
                <TextField
                label="UserName"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            <div className="login-control">
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <Button variant="filled" type="submit" value="Login" >LogIn</Button>
        </form>
    )
}

export default Login;