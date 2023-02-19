
///import * as Autodesk from "@types/forge-viewer";

// eslint-disable-next-line no-undef
export class SensorDetailPanel extends Autodesk.Viewing.UI.PropertyPanel{
    constructor(viewer, id, title, options) {
        super(viewer.container, id, title, options);
        // this.viewer = viewer;
        this.container.style.left = '0px';
        this.container.style.top = '0px';
        this.container.style.width = '300px';
        this.container.style.height = '500px';
        this.container.style.resize = 'none';
    }
}