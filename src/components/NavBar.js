import React, { useState } from "react";
import "../css/Navbar.css";
import { useHistory} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { IoAddCircleOutline } from "react-icons/io5";

const NavBar = ({ user, setNewJModOpen, setNewGModOpen, setNewGuestModOpen }) => {

    

    const history = useHistory();
    const location=history.location.pathname
    const changeTabs = (e) => {
        history.push(`/${e}`);
    };
    const [anchorE1, setAnchorE1] = useState(null);
    const menuClose = () => {
        setAnchorE1(null);
    };
    const openMenu = (e) => {
        setAnchorE1(e.currentTarget);
    };

    const menuOptions = () => {
        if(location === "/me"){
            return(<MenuItem onClick={()=> {menuClose(); setNewJModOpen(true)}}>New Journal</MenuItem>)
        }else if(location === "/mygoals"){
            return(<MenuItem onClick={()=> {menuClose(); setNewGModOpen(true)}}>New GoalList</MenuItem>
            )
        }else if(location.includes("/journals")){
            return(<MenuItem onClick={()=> {menuClose(); setNewGuestModOpen(true)}}>Add Guest</MenuItem>)

        }
                  
    }



    return (
        <AppBar  className="nav-bar"position="sticky">
        <Toolbar className="navbar">
            <section>
            <IoAddCircleOutline onClick={openMenu} size={45}></IoAddCircleOutline>
            <Menu
                anchorEl={anchorE1}
                // keepMounted
                open={Boolean(anchorE1)}
                onClose={menuClose}
            >
                {menuOptions()}
                
                </Menu>
            <ButtonGroup variant="contained" size="large">
            <Button onClick={() => changeTabs("me")} id="me">
                DashBoard
            </Button>
            <Button onClick={() => changeTabs("mygoals")} id="mygoals">
                MyGoals
            </Button>
            <Button>Three</Button>
            </ButtonGroup>
            </section>

            <div>User Avatar</div>
        </Toolbar>
        <Typography variant="h3" id="welcome">
                Welcome {user ? user.name : null}
            </Typography>
        </AppBar>
    );
};

export default NavBar;
