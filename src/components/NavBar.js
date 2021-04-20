import React, { useState } from "react";
import "../css/Navbar.css";
import { useHistory} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Avatar, Menu, MenuItem, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { IoAddCircleOutline } from "react-icons/io5";


const NavBar = ({ user, setNewJModOpen, setNewGModOpen, setNewGuestModOpen, setUser }) => {

    
    const [isDash, setIsDash] = useState(true)
    const history = useHistory();
    const location = history.location.pathname
    const changeTabs = (e) => {
        history.push(`/${e}`);
    };
    const [anchorE1, setAnchorE1] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null)
    const menuClose = () => {
        setAnchorE1(null);
    };
    const openMenu = (e) => {
        setAnchorE1(e.currentTarget);
    };

    const profileMenuClose = () => {
        setAnchorE2(null)
    }

    const menuOptions = () => {
        if(location === "/dashboard"){
            return(<MenuItem onClick={()=> {menuClose(); setNewJModOpen(true)}}>New Journal</MenuItem>)
        }else if(location === "/mygoals"){
            return(<MenuItem onClick={()=> {menuClose(); setNewGModOpen(true)}}>New GoalList</MenuItem>
            )
        }else if(location.includes("/journals")){
            return(<MenuItem onClick={()=> {menuClose(); setNewGuestModOpen(true)}}>Add Guest</MenuItem>)

        }   
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    const dashStyles = makeStyles({
        root: {
            backgroundColor: isDash ? "rgb(0 76 104)" : null,
            color: isDash ? "white" : null,
            border: isDash ? "1px solid white" : "1px solid rgb(0 76 104)",
            fontFamily:"Kalam"
        }
    })

    const dashboardStyle = dashStyles()
    const useStyles = makeStyles({
        root: {
            backgroundColor: !isDash ? "rgb(0 76 104)" : null,
            color: !isDash ? "white" : null,
            border: !isDash ?"1px solid white" : "1px solid rgb(0 76 104)",
            fontFamily:"Kalam"
        }
    })

    const goalsStyle = useStyles()

    const welcomeStyles = makeStyles({
        root: {
            fontFamily:"Kalam"
        }
    })
    const welcomeStyle = welcomeStyles()

    return (
        <AppBar  className="nav-bar"position="sticky">
        <Toolbar className="navbar">
            {user && <>
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
            <Button className={dashboardStyle.root} onClick={() => {changeTabs("dashboard"); setIsDash(true)}} id="me">
                DashBoard
            </Button>
            <Button className={goalsStyle.root} onClick={() => {changeTabs("mygoals"); setIsDash(false)}} id="mygoals">
                MyGoals
            </Button>
            {/* <Button>Three</Button> */}
            </ButtonGroup>
            </section>

            <Avatar onClick={(e)=> setAnchorE2(e.currentTarget)} onMouseEnter={e=> e.target.style.cursor = "pointer"}></Avatar>
            <Menu 
                anchorEl={anchorE2}
                open={Boolean(anchorE2)}
                onClose={profileMenuClose}
            >
                <MenuItem onClick={()=> {profileMenuClose(); history.push("/me")}}>My Profile</MenuItem>
                <MenuItem onClick={logout}>LogOut</MenuItem>
            </Menu> 
            </>}
            
        </Toolbar> 
        <Typography className={welcomeStyle.root} variant="h3" id="welcome" >
                Welcome {user ? user.name : "to MomentJournal"}
        </Typography>
        </AppBar>
    );
};

export default NavBar;
