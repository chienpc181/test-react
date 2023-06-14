import React, {Component} from "react";
import SensorList from "../Components/SensorList";

class MainBoard extends Component {
    componentDidMount() {
        const linkNavBars = document.querySelectorAll('.main-navbar ul li a');
        const linkTabs = document.querySelectorAll('.tab-pane ul li a');
        
        const tabPane_Mains = document.getElementsByClassName("tab-pane main");
        
        linkNavBars.forEach(function (link) {
          link.addEventListener('click', function (e) {
            // PreventDefault to prevent redirect
            e.preventDefault();
            linkNavBars.forEach(function (element) {
                element.classList.remove('active');
              });
            this.classList.add('active');
            
            for (let i = 0; i < tabPane_Mains.length; i++) {
                tabPane_Mains[i].classList.remove('active');
              }
            const dashboard = document.getElementById("Dashboard");
            if(this.href.includes(dashboard.id)) {
                
                dashboard.classList.add("active");
            }
            const monitoring = document.getElementById("Monitoring");
            if(this.href.includes(monitoring.id)) {
                
                monitoring.classList.add("active");
            }
            const maintenance = document.getElementById("Maintenance");
            if(this.href.includes(maintenance.id)) {
                
                maintenance.classList.add("active");
            }
            const management = document.getElementById("Management");
            if(this.href.includes(management.id)) {
                management.classList.add("active");
            }
          });
        });
        linkTabs.forEach(function (link){
            link.addEventListener('click', function (e) {
                e.preventDefault();
                linkTabs.forEach(function (element) {
                    element.classList.remove('active');
                  });
                this.classList.add('active');

                const sensorList = document.getElementById("SensorList");
                const camera = document.getElementById("Camera");
                sensorList.classList.remove("active");
                camera.classList.remove("active");
                if(this.href.includes(sensorList.id)) {
                    sensorList.classList.add("active");
                }
                if(this.href.includes(camera.id)) {
                    camera.classList.add("active");
                }
            });
        });
    }
    
    render() {
        return (
            <div className="main-board">
                <div className="main-navbar">
                    <ul className="mynavbar-main">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#Dashboard">Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#Monitoring" role={"tab"}>Monitoring</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#Maintenance">Maintenance</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#Management" >Management</a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content">
                    <div className="tab-pane main" id="Dashboard">
                        <ul>
                            <li>
                                <a></a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane">
                                Dashboard testing...
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane main active" id="Monitoring">
                        <ul className="mynavbar-tab">
                            <li className="nav-item">
                                <a className="nav-link active" href="#SensorList">Sensor</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#Camera">Camera</a>
                            </li>
                        </ul>
                        <div className="tab-content" >
                            <div className="tab-pane active" id="SensorList">
                                <SensorList />
                            </div>
                            <div className="tab-pane" id="Camera">
                                Camera will comming soon...
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane main" id="Maintenance">
                        <ul>
                            <li>
                                <a></a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane">
                                Maintenance testing...
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane main" id="Management">
                        <ul>
                            <li>
                                <a></a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane">
                                Management testing...
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default MainBoard; 