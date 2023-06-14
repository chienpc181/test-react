import React, {Component} from "react";
import {AppBar, Toolbar, Typography, IconButton, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Viewer from "./Viewer/Viewer";
import SensorList from "./Components/SensorList";
import MainBoard from "./Viewer/MainBoard";
// import {DataChart, ChronosTimeSlider} from 'forge-dataviz-iot-react-components';
import logo from "../Logo.png";

function Home() {
    
    return (
        <div className="containter" >
            {/* <AppBar position="static" >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Testing....
                    </Typography>
                    <Button color="inherit" >Login</Button>
                </Toolbar>
            </AppBar> */}

            <div className="left-side">
                <div className="header" id="header">
                    <img src={logo} alt="Daces"/>
                    <h5>Daces IoT Demo</h5>
                </div>
                <div className="viewer">
                    <Viewer/>

                </div>
            </div>
            <div className="right-side">
                <MainBoard/>
            </div>
        </div>
    )
    
}

export default Home;
