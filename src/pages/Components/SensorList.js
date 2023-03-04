import React, { useState, useEffect } from "react"
import { querySensorLastInfo, getRealtimeData, TestRealtime, getChartLast10 } from "../../firebase/config"
import SensorChart from "./SensorChart";

function SensorList() {
    const [sensors, setSensors] = useState([
    { Name: "Sensor Test", Id: "ESP32_SensorTest", Active: true, 
    lastValue: {AirQuality: 0, Dust: 0, Loudness: 0, Vibration: 0, LastUpdate: ""}, chart: {data: [], labels: [], maxAt: ""} },
    { Name: "Sensor 1", Id: "ESP32_Sensor1", Active: true, 
    lastValue: {AirQuality: 0, Dust: 0, Loudness: 0, Vibration: 0, LastUpdate: ""}, chart: {data: [], labels: [], maxAt: ""} }, 
    { Name: "Sensor 2", Id: "ESP32_Sensor2", Active: true, 
    lastValue: {AirQuality: 0, Dust: 0, Loudness: 0, Vibration: 0, LastUpdate: ""}, chart: {data: [], labels: [], maxAt: ""} },
    { Name: "Sensor 3", Id: "ESP32_Sensor3", Active: true, 
    lastValue: {AirQuality: 0, Dust: 0, Loudness: 0, Vibration: 0, LastUpdate: ""}, chart: {data: [], labels: [], maxAt: ""}},
    { Name: "Sensor 4", Id: "ESP32_Sensor4", Active: true, 
    lastValue: {AirQuality: 0, Dust: 0, Loudness: 0, Vibration: 0, LastUpdate: ""}, chart: {data: [], labels: [], maxAt: ""}},
    { Name: "Sensor 5", Id: "ESP32_Sensor5", Active: true, 
    lastValue: {AirQuality: 0, Dust: 0, Loudness: 0, Vibration: 0, LastUpdate: ""}, chart: {data: [], labels: [], maxAt: ""}},
    { Name: "Sensor 7", Id: "ESP32_Sensor7", Active: true, 
    lastValue: {AirQuality: 0, Dust: 0, Loudness: 0, Vibration: 0, LastUpdate: ""}, chart: {data: [], labels: [], maxAt: ""}}
    ]);

    // const [data3, setData3] = useState([]);
    // const [labels3, setlabels3] = useState([]);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         let data = [];
    //         sensors.forEach(async (sensor) => {
    //             const info = await querySensorLastInfo(sensor.Id);
                
    //             data.push({ ...sensor, lastValue: info });
    //             await setSensors(data);
    //         })
    //     }, 1000);
    //     return () => clearTimeout(timer);
    // }, []);

    useEffect(() => {
        const fetchItems = async () => {
            let data = [];
            sensors.forEach(async (sensor) => {
                const info = await querySensorLastInfo(sensor.Id);
                const chartData = await getChartLast10(sensor.Id);
                
                data.push({ ...sensor, lastValue: info, chart: chartData });
                setSensors(data);
            });

            // const airQualities3 = await getChartLast10(sensors[3].Id);
            // setData3(airQualities3.map(max => max.value));
            // setlabels3(airQualities3.map(max => max.time));
        }
        fetchItems();
    }, []);

    const renderSensors = sensors.map((item, index) => (
        <div key={index} className="sensor-list-item">
            {/* <div className="sensor-header">
                <h6>{item.Name}</h6>
            </div>
            <div className="sensor-details">
                <div className="sensor-detail">Air quality: {item.lastValue.AirQuality}</div>
                <div className="sensor-detail">Dust: {item.lastValue.Dust}</div>
                <div className="sensor-detail">Loudness: {item.lastValue.Loudness}</div>
                <div className="sensor-detail">Vibration: {item.lastValue.Vibration}</div>
                <div className="sensor-detail">Update: {item.lastValue.LastUpdate}</div>
            </div> */}
            <SensorChart title={item.Name} label="Loudness" data={item.chart.data} labels={item.chart.labels} maxAt={item.chart.maxAt} color="yellow"/>
        </div>

    ));




    return (
        <div className="sensor-list-component">
            {/* <SensorChart title="Sensor 3" label="Loudness" data={data3} labels={labels3} color="yellow"/> */}
            <div>
                <h5>Sensor List</h5>
            </div>
            <div className="sensor-list">{renderSensors}</div>
        </div>

    )

}

export default SensorList;