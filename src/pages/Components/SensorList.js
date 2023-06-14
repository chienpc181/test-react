import React, {Component, useState, useEffect } from "react"
import { getChartLast10Days } from "../../firebase/config"
import SensorChart from "./SensorChart";


function generateData() {
    const currentDate = new Date();
    const formattedTime = currentDate.toTimeString().slice(0, 8); // Extract the time portion from the Date object
    const randomValue = Math.floor(Math.random() * 40) + 35; // Generate a random value between 45 and 75
    
    return {
        label: formattedTime,
        value: randomValue,
    };
}

function updateSensor(sensor, newData) {
    sensor.chart.data.push(newData.value);
    sensor.chart.labels.push(newData.label);
}

class SensorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensors: [
                // { Name: "Sensor Test", Id: "ESP32_SensorTest", Active: true, 
                // chart: {data: [], labels: [], maxAt: ""} },
                { Name: "Sensor 1", Id: "ESP32_Sensor1", Active: true, 
                chart: {data: [], labels: [], maxAt: ""} }, 
                { Name: "Sensor 2", Id: "ESP32_Sensor2", Active: true, 
                chart: {data: [], labels: [], maxAt: ""} },
                { Name: "Sensor 3", Id: "ESP32_Sensor3", Active: true, 
                chart: {data: [], labels: [], maxAt: ""}},
                { Name: "Sensor 4", Id: "ESP32_Sensor4", Active: true, 
                chart: {data: [], labels: [], maxAt: ""}},
                // { Name: "Sensor 5", Id: "ESP32_Sensor5", Active: true, 
                // chart: {data: [], labels: [], maxAt: ""}},
                // { Name: "Sensor 7", Id: "ESP32_Sensor7", Active: true, 
                // chart: {data: [], labels: [], maxAt: ""}}
                ],
            sensorType: "AirQuality",
        }
    }
    
    componentDidMount() {
        // const data = [];
        // this.state.sensors.forEach(async (sensor) => {
        //     const chartData = await getChartLast10Days(sensor.Id, this.state.sensorType);
        //     data.push({...sensor, chart: chartData});
        //     this.setState({sensors: data});
        // });

        
        this.interval = setInterval(() => {
            let data = [];
            for (let i=0; i<this.state.sensors.length; i++){
                const newObject = generateData();
                updateSensor(this.state.sensors[i], newObject);
                data.push({...this.state.sensors[i]});
                if (data[i].chart.data.length > 20){
                    data[i].chart.labels.splice(0, 1);
                    data[i].chart.data.splice(0, 1);
                }
                this.setState({sensors: data});
            }
        }, 2000);
    }
    
    selectSensor = (event) => {
        // this.setState({sensorType: event.target.value});
        // const data = [];
        // this.state.sensors.forEach(async (sensor) => {
        //     const chartData = await getChartLast10Days(sensor.Id, event.target.value);
        //     data.push({...sensor, chart: chartData});
        //     this.setState({sensors: data});
        // });


        let data = [];
        for (let i=0; i<this.state.sensors.length; i++){
            const newObject = generateData();
            updateSensor(this.state.sensors[i], newObject);
            data.push({...this.state.sensors[i]});

            data[i].chart.labels.splice(0, data[i].chart.data.length - 2);
            data[i].chart.data.splice(0, data[i].chart.data.length - 2);
            this.setState({sensors: data});
        }
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