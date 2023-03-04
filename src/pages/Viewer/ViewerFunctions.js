/* global Autodesk, THREE */
import Client from "../Auth";
import axios from "axios";
import { ModelSummaryExtension } from "../extensions/modelsummaryextension";
import { SensorListExtension } from "../extensions/sensorListExtension";
import { SensorDetailExtension } from "../extensions/SensorDetailExtension";


var getToken = {accessToken: Client.getAccessToken()}
var viewer;

function launchViewer(div, urn){
    getToken.accessToken.then((token) => {
        var options = {
            'env': 'AutodeskProduction',
            'accessToken': token.access_token
        };
        Autodesk.Viewing.Initializer(options, () => {
            var htmlDiv = document.getElementById(div);
            var optViews = {
                extensions: ['ModelSummaryExtension', 'SensorListExtension', 'SensorDetailExtension'],
            }
            viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv, optViews);
            var startedCode = viewer.start();
            if (startedCode > 0) {
                console.error('Failed to create a Viewer: WebGL not supported.');
                return;
            }
        
            console.log('Initialization complete, loading a model next...');
        
        });

        var documentId = urn;
        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);

        function onDocumentLoadSuccess(viewerDocument) {
            var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
            viewer.loadDocumentNode(viewerDocument, defaultModel);
        }

        function onDocumentLoadFailure() {
            console.error('Failed fetching Forge manifest');
        }
        
    })
}

export default launchViewer;