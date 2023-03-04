/* global Autodesk, THREE */
import { getRealtimeData, querySensorLast10, querySensorTest } from "../../firebase/config";
import { SensorDetailPanel } from "./SensorDetailPanel";

export class SensorListPanel extends Autodesk.Viewing.UI.PropertyPanel {
    constructor(viewer, container, id, title, options) {
        super(container, id, title, options);
        this.viewer = viewer;
    }

    initialize() {
        this.title = this.createTitleBar(this.titleLabel || this.container.id);
        this.initializeMoveHandlers(this.title);
        this.container.appendChild(this.title);
        this.content = document.createElement('div');
        this.content.style.height = '350px';
        this.container.style.height = '350px';
        this.content.style.backgroundColor = 'white';
        this.content.innerHTML = `<div class="datagrid-container" style="position: relative; height: 350px;"></div>`;
        this.container.appendChild(this.content);
        let sensors = [{Name: "Sensor 1", Id: "ESP32_Sensor1", Active: true}, {Name: "Sensor 2", Id: "ESP32_Sensor2", Active: true}, 
        {Name: "Sensor 3", Id: "ESP32_Sensor3", Active: true}, {Name: "Sensor Test", Id: "ESP32_SensorTest", Active: false},
        {Name: "Sensor 4", Id: "ESP32_Sensor4", Active: true}, {Name: "Sensor 5", Id: "ESP32_Sensor5", Active: false},
        {Name: "Sensor 6", Id: "ESP32_Sensor6", Active: true}, {Name: "Sensor 7", Id: "ESP32_Sensor7", Active: false}]
        // eslint-disable-next-line no-undef
        this.table = new Tabulator('.datagrid-container', {
            height: '100%',
            layout: 'fitColumns',
            groupBy: 'group',
            data: sensors,
            autoColumns: true,
        });
        this.table.on('rowClick', async (ev, row) => {
            if(this.panel == null || !this.panel.isVisible()){
                this.panel = new SensorDetailPanel(this.viewer, 'sensorDetail', 'Sensor Detail');
                this.panel.setVisible(true);

                let sensorDatas = await getRealtimeData(row.getData().Id);
                // if(Array.isArray(sensorDatas) && !sensorDatas.length){
                //     sensorDatas = await querySensorLast10(row.getData().Id);
                // };

                sensorDatas.forEach((sensor) => {
                    this.panel.addProperty("Air quality", sensor.AirQuality, sensor.id);
                    this.panel.addProperty("Dust", sensor.Dust, sensor.id);
                    this.panel.addProperty("Loudness", sensor.Loudness, sensor.id);
                    this.panel.addProperty("Vibration", sensor.Vibration, sensor.id);
                    this.panel.addProperty("Time", sensor.Time.toDate(), sensor.id);
                });
            }
            
        });
    }
}