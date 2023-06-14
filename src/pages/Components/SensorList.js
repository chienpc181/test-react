import React, {Component, useState, useEffect } from "react"
import { getChartLast10Days } from "../../firebase/config"
import SensorChart from "./SensorChart";

// function SensorList() {
//     const [sensors, setSensors] = useState([
//     { Name: "Sensor Test", Id: "ESP32_SensorTest", Active: true, 
//     chart: {data: [], labels: [], maxAt: ""} },
//     { Name: "Sensor 1", Id: "ESP32_Sensor1", Active: true, 
//     chart: {data: [], labels: [], maxAt: ""} }, 
//     { Name: "Sensor 2", Id: "ESP32_Sensor2", Active: true, 
//     chart: {data: [], labels: [], maxAt: ""} },
//     { Name: "Sensor 3", Id: "ESP32_Sensor3", Active: true, 
//     chart: {data: [], labels: [], maxAt: ""}},
//     { Name: "Sensor 4", Id: "ESP32_Sensor4", Active: true, 
//     chart: {data: [], labels: [], maxAt: ""}},
//     { Name: "Sensor 5", Id: "ESP32_Sensor5", Active: true, 
//     chart: {data: [], labels: [], maxAt: ""}},
//     { Name: "Sensor 7", Id: "ESP32_Sensor7", Active: true, 
//     chart: {data: [], labels: [], maxAt: ""}}
//     ]);
//     const [sensorType, setSensorType] = useState("AirQuality");
    
//     useEffect(() => {
//         const fetchItems = async () => {
//             sensors.forEach(async (sensor) => {
//                 const chartData = await getChartLast10Days(sensor.Id, sensorType);
//                 sensor.chart = chartData;
//                 setSensors(sensors);
//             });
//         }
//         fetchItems();
//     }, [sensorType, sensors]);

//     const selectSensor = (event) => {
//         setSensorType(event.target.value);
//     }

//     return (
//         <div className="sensor-list-component">
//             {sensorType}
//             <div className="sensor-filter">
//                 <div>
//                     <label>Sensor type</label>
//                     <select className="form-select form-select-sm" onChange={selectSensor}>
//                         <option>AirQuality</option>
//                         <option>Dust</option>
//                         <option>Loudness</option>
//                         <option>Vibration</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label>Level</label>
//                     <select className="form-select form-select-sm">
//                         <option>Ground</option>
//                         <option>Level 1</option>
//                         <option>Level 2</option>
//                         <option>Roof</option>
//                     </select>
//                 </div>
//             </div>
//             <div className="sensor-list">
//                 {
//                     sensors.map((sensor, index) => (
//                         <div key={index} className="sensor-list-item">
//                             <SensorChart title={sensor.Name} label={sensorType} data={sensor.chart.data} labels={sensor.chart.labels} maxAt={sensor.chart.maxAt} color="#EBB30B"/>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>

//     )

// }



class SensorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensors: [
                { Name: "Sensor Test", Id: "ESP32_SensorTest", Active: true, 
                chart: {data: [], labels: [], maxAt: ""} },
                { Name: "Sensor 1", Id: "ESP32_Sensor1", Active: true, 
                chart: {data: [], labels: [], maxAt: ""} }, 
                { Name: "Sensor 2", Id: "ESP32_Sensor2", Active: true, 
                chart: {data: [], labels: [], maxAt: ""} },
                { Name: "Sensor 3", Id: "ESP32_Sensor3", Active: true, 
                chart: {data: [], labels: [], maxAt: ""}},
                { Name: "Sensor 4", Id: "ESP32_Sensor4", Active: true, 
                chart: {data: [], labels: [], maxAt: ""}},
                { Name: "Sensor 5", Id: "ESP32_Sensor5", Active: true, 
                chart: {data: [], labels: [], maxAt: ""}},
                { Name: "Sensor 7", Id: "ESP32_Sensor7", Active: true, 
                chart: {data: [], labels: [], maxAt: ""}}
                ],
            sensorType: "AirQuality",
        }
    }
    async componentDidMount() {
        const data = [];
        this.state.sensors.forEach(async (sensor) => {
            const chartData = await getChartLast10Days(sensor.Id, this.state.sensorType);
            data.push({...sensor, chart: chartData});
            this.setState({sensors: data});
        });
    }
    
    selectSensor = async (event) => {
        this.setState({sensorType: event.target.value});
        const data = [];
        this.state.sensors.forEach(async (sensor) => {
            const chartData = await getChartLast10Days(sensor.Id, event.target.value);
            data.push({...sensor, chart: chartData});
            this.setState({sensors: data});
        });
    }

    render() {
        return (
            <div className="sensor-list-component">
                <div className="sensor-filter">
                    <div>
                        <label>Sensor type</label>
                        <select className="form-select form-select-sm" onChange={this.selectSensor}>
                            <option>AirQuality</option>
                            <option>Dust</option>
                            <option>Loudness</option>
                            <option>Vibration</option>
                        </select>
                    </div>
                    <div>
                        <label>Level</label>
                        <select className="form-select form-select-sm">
                            <option>Ground</option>
                            <option>Level 1</option>
                            <option>Level 2</option>
                            <option>Roof</option>
                        </select>
                    </div>
                </div>
                <div className="sensor-list">
                    {
                        this.state.sensors.map((sensor, index) => (
                            <div key={index} className="sensor-list-item">
                                <SensorChart title={sensor.Name} label={this.state.sensorType} data={sensor.chart.data} labels={sensor.chart.labels} maxAt={sensor.chart.maxAt} color="#EBB30B"/>
                            </div>
                        ))
                    }
                </div>
            </div>
    
        )
    }
    

}

export default SensorList;