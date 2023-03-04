import React, {Component} from "react";
import {AppBar, Toolbar, Typography, IconButton, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Viewer from "./Viewer/Viewer";
import SensorList from "./Components/SensorList";
// import {DataChart, ChronosTimeSlider} from 'forge-dataviz-iot-react-components';

function Home() {
    
    return (
        <div className="" >
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
            <div className="" style={{position: "absolute", width: "70%", height: "100%"}}>
                <Viewer/>
            </div>
            {/* <div className="sensor-list" style={{position: "absolute", width: "20%", height: "100%", marginLeft: "80%"}}>
                <SensorList/>
            </div> */}
            <SensorList/>
            
        </div>
    )
    
}

export default Home;
