/* global Autodesk, THREE */
import { querySensorLast10, createSensorDetail } from "../../firebase/config";
import { SensorDetailPanel } from "./SensorDetailPanel";

export class SensorDetailExtension extends Autodesk.Viewing.Extension{
    constructor(viewer, options) {
        super(viewer, options);
        this._group = null;
        this._button = null;
    }

    load(){
        console.log('SensorDetailExtension has been loaded');
        return true;
    }

    unload(){
        // Clean our UI elements if we added any
        if (this._group) {
            this._group.removeControl(this._button);
            if (this._group.getNumberOfControls() === 0) {
                this.viewer.toolbar.removeControl(this._group);
            }
        }
        console.log('SensorDetailExtension has been unloaded');
        return true;
    }

    onToolbarCreated() {
        // Create a new toolbar group if it doesn't exist
        this._group = this.viewer.toolbar.getControl('allMyAwesomeExtensionsToolbar');
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup('allMyAwesomeExtensionsToolbar');
            this.viewer.toolbar.addControl(this._group);
        }
        
        // Add a new button to the toolbar group
        this._button = new Autodesk.Viewing.UI.Button('SensorDetailExtensionButton');
        this._button.onClick = async (ev) => {
            // Execute an action here
            // Check if the panel is created or not
            // if (this._panel == null) {
            //     this._panel = new SensorDetailPanel(this.viewer, 'sensorDetail', 'Sensor Detail');
            // }
            // Show/hide docking panel
            // this._panel.setVisible(!this._panel.isVisible());

            // If panel is NOT visible, exit the function
            // if (!this._panel.isVisible())
            //     return;
            // const sensorDatas = await querySensorLast10("ESP32_SensorTest");
            // sensorDatas.forEach((sensor) => {
            //     this._panel.addProperty("Air quality", sensor.AirQuality, sensor.id);
            //     this._panel.addProperty("Dust", sensor.Dust, sensor.id);
            //     this._panel.addProperty("Loudness", sensor.Loudness, sensor.id);
            //     this._panel.addProperty("Vibration", sensor.Vibration, sensor.id);
            //     this._panel.addProperty("Time", sensor.Time.toDate(), sensor.id);
            // });
            const newRecord = await createSensorDetail("ESP32_SensorTest");

            };
        this._button.setToolTip('Sensor Detail Extension');
        this._button.addClass('sensorDetailExtensionIcon');
        this._group.addControl(this._button);
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension('SensorDetailExtension', SensorDetailExtension);

