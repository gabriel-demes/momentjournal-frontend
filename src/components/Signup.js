import { Button, TextField } from "@material-ui/core";
import {useState, } from "react"
import { useHistory } from "react-router";



const SignUp = ({setUser}) => {

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: ""
        }
    );
    const [errors, setErrors] = useState([])
    const history = useHistory();
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetch("http://localhost:3000/signup",{
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
            const {user, token} = data
            localStorage.setItem("token", token)
            setUser(user)
            history.push("/dashboard")
        })
        .catch(data => {
            setErrors(data.errors)
        })
    }
    
    return(
        <form autoComplete="off" onSubmit={handleSubmit} id="signup-form">
            {errors.map(err => <p key={err}>{err}</p>)}
            <h1>Sign Up</h1>
            <div className="signup-control">

                <TextField
                    label="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange} 
                />
            </div>
            <div className="signup-control">
                <TextField
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange} 
                />
            </div>
            <div className="signup-control">
                <TextField
                    label="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            
            <Button type="submit">Sign Up</Button> 
        </form>
    )

}

export default SignUp