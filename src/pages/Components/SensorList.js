import React, {Component, useState, useEffect } from "react"
import { getChartLast10Days } from "../../firebase/config"
import SensorChart from "./SensorChart";


function createRandomNumber(min, max) {
    return Math.random()*(max - min) + min;
}

function generateData(sensorType) {
    const currentDate = new Date();
    const formattedTime = currentDate.toTimeString().slice(0, 8); // Extract the time portion from the Date object
    if (sensorType === 'CO'){
        const randomValue = createRandomNumber(0.5,5);
    
        return {
            label: formattedTime,
            value: randomValue,
        };
    }
    if (sensorType === 'Loudness'){
        const randomValue = createRandomNumber(50,65);
    
        return {
            label: formattedTime,
            value: randomValue,
        };
    }
    if (sensorType === 'NO2'){
        const randomValue = createRandomNumber(0.05,0.06);
    
        return {
            label: formattedTime,
            value: randomValue,
        };
    }
    if (sensorType === 'PM 2.5'){
        const randomValue = createRandomNumber(0.04,0.08);
    
        return {
            label: formattedTime,
            value: randomValue,
        };
    }
    if (sensorType === 'Vibration'){
        const randomValue = createRandomNumber(10,30);
    
        return {
            label: formattedTime,
            value: randomValue,
        };
    }
}

function updateSensor(sensor, newData, sensorType) {
    sensor.chart.data.push(newData.value);
    sensor.chart.labels.push(newData.label);
    if (sensorType === 'CO') {
        sensor.chart.minRange = 0;
        sensor.chart.maxRange = 40;
        sensor.chart.unit = 'ppm';
    }
    if (sensorType === 'Loudness') {
        sensor.chart.minRange = 35;
        sensor.chart.maxRange = 150;
        sensor.chart.unit = 'dB(A)';
    }
    if (sensorType === 'NO2') {
        sensor.chart.minRange = 0;
        sensor.chart.maxRange = 0.2;
        sensor.chart.unit = 'ppm';
    }
    if (sensorType === 'PM 2.5') {
        sensor.chart.minRange = 0;
        sensor.chart.maxRange = 0.15;
        sensor.chart.unit = 'mg/m3';
    }
    if (sensorType === 'Vibration') {
        sensor.chart.minRange = 0;
        sensor.chart.maxRange = 40;
        sensor.chart.unit = 'Hz';
    }
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
            sensorType: "CO",
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
                const newObject = generateData(this.state.sensorType);
                updateSensor(this.state.sensors[i], newObject, this.state.sensorType);
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
        this.setState({sensorType: event.target.value}, () => {
            // console.log(this.state.sensorType);

            let data = [];
            for (let i=0; i<this.state.sensors.length; i++){
                const newObject = generateData(this.state.sensorType);
                updateSensor(this.state.sensors[i], newObject, this.state.sensorType);
                data.push({...this.state.sensors[i]});

                data[i].chart.labels.splice(0, data[i].chart.data.length - 1);
                data[i].chart.data.splice(0, data[i].chart.data.length - 1);
                this.setState({sensors: data});
            }
        });
        
        
        // const data = [];
        // this.state.sensors.forEach(async (sensor) => {
        //     const chartData = await getChartLast10Days(sensor.Id, event.target.value);
        //     data.push({...sensor, chart: chartData});
        //     this.setState({sensors: data});
        // });


        
    }

    render() {
        return (
            <div className="sensor-list-component">
                <div className="sensor-filter">
                    <div>
                        <label>Sensor type</label>
                        <select className="form-select form-select-sm" onChange={this.selectSensor}>
                            <option>Loudness</option>
                            <option>Vibration</option>
                            <option>CO</option>
                            <option>NO2</option>
                            <option>PM 2.5</option>
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
                                <SensorChart title={sensor.Name} label={this.state.sensorType} data={sensor.chart.data} labels={sensor.chart.labels} maxAt={sensor.chart.maxAt} minRange={sensor.chart.minRange} maxRange={sensor.chart.maxRange} unit={sensor.chart.unit} color="#EBB30B"/>
                            </div>
                        ))
                    }
                </div>
            </div>
    
        )
    }
    

}

export default SensorList;