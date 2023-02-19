/* global Autodesk, THREE */
import { querySensor1 } from "../../firebase/config";
import { SensorListPanel } from "./SensorListPanel";

export class SensorListExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this._group = null;
        this._button = null;
    }

    async load() {
        await Promise.all([
            this.loadScript('https://unpkg.com/tabulator-tables@5.1.7/dist/js/tabulator.min.js', 'Tabulator'),
            this.loadStylesheet('https://unpkg.com/tabulator-tables@5.1.7/dist/css/tabulator_midnight.min.css')
        ]);
        
        console.log('SensorListExtension has been loaded');
        return true;
    }

    unload() {
        // Clean our UI elements if we added any
        if (this._group) {
            this._group.removeControl(this._button);
            if (this._group.getNumberOfControls() === 0) {
                this.viewer.toolbar.removeControl(this._group);
            }
        }
        console.log('SensorListExtension has been unloaded');
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
        this._button = new Autodesk.Viewing.UI.Button('SensorListExtensionButton');
        this._button.onClick = async (ev) => {
            // Execute an action here
            // Check if the panel is created or not
            if (this._panel == null) {
                this._panel = new SensorListPanel(this.viewer, this.viewer.container, 'sensorList', 'Sensor list');
            }
            // Show/hide docking panel
            this._panel.setVisible(!this._panel.isVisible());

            // If panel is NOT visible, exit the function
            if (!this._panel.isVisible())
                return;
                // const sensors = await querySensor1();
                // // const sensors = [{id: 1, name: 'Sensor 1', airQuality: 0, dust: 0.1, loudness: 56},{id: 2, name: 'Sensor 1', airQuality: 0, dust: 0.11, loudness: 56},{id: 3, name: 'Sensor 1', airQuality: 10, dust: 10.1, loudness: 156}];
                // sensors.forEach((sensor) => {
                //     this._panel.addProperty("Air quality", sensor.AirQuality, sensor.id);
                //     this._panel.addProperty("Dust", sensor.Dust, sensor.id);
                //     this._panel.addProperty("Loudness", sensor.Loudness, sensor.id);
                //     this._panel.addProperty("Vibration", sensor.Vibration, sensor.id);
                //     this._panel.addProperty("Time", sensor.Time, sensor.id);
                // })




        };
        this._button.setToolTip('Sensor List Extension');
        this._button.addClass('sensorListExtensionIcon');
        this._group.addControl(this._button);
    }

    loadScript(url, namespace) {
        for (const script of document.querySelectorAll('script').values()) {
            if (script.src === url) {
                return Promise.resolve();
            }
        }
        // @ts-ignore
        if (namespace && window[namespace] !== undefined) {
            console.warn('Script is already loaded but not from the requested URL', url);
        }
        return new Promise(function (resolve, reject) {
            const script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', url);
            script.onload = () => resolve();
            script.onerror = (err) => reject(err);
            document.head.appendChild(script);
        });
    }
    loadStylesheet(url) {
        for (const link of document.querySelectorAll('link').values()) {
            if (link.href === url) {
                return Promise.resolve();
            }
        }
        return new Promise(function (resolve, reject) {
            const link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', url);
            link.onload = () => resolve();
            link.onerror = (err) => reject(err);
            document.head.appendChild(link);
        });
    }

}

Autodesk.Viewing.theExtensionManager.registerExtension('SensorListExtension', SensorListExtension);



