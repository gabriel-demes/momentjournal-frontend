import React from "react"
import "../css/Navbar.css";
import {useHistory} from "react-router-dom"

const NavBar = ({user}) => {

    const history = useHistory()
    const changeTabs = (e) => {
        history.push(`/${e.target.id}`)
    }
    return(
        <div className="navbar">
            <button>ADD</button>
            <div className="tabs">
            <div onClick={changeTabs} id="me">DashBoard</div>
            <div onClick={changeTabs} id="mygoals">My Goals</div>
            <div>Resources</div>
            </div>
            <h3>Welcome {user? user.name:null}</h3>
            <div>User Avatar</div>

        </div>
    )
}

export default NavBar
