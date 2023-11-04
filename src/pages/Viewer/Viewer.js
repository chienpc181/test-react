import React, {Component} from "react";
import launchViewer from './ViewerFunctions';
// import Client from "../Auth";

class Viewer extends Component {
    componentDidMount(){
        // var docId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cDNoY3o4N3JrYWNnenBhcmNncGczYWN4d2M0Z213anotZGVzaWduYXV0b21hdGlvbi9yc3RfYmFzaWNfc2FtcGxlX3Byb2plY3QucnZ0';
        // var docId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cDNoY3o4N3JrYWNnenBhcmNncGczYWN4d2M0Z213anotcGNjX2R4Zi9DTFUtQVVELUFSQy1BdWRpdG9yaXVtLVAyLTIyMTIyOC5ydnQ';
        // var docId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cDNoY3o4N3JrYWNnenBhcmNncGczYWN4d2M0Z213anotcGNjX2R4Zi9DTFUtQVVEMS1BUkMtQXVkaXRvcml1bS1QMi0yMzA2MTcucnZ0';
        var docId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cDNoY3o4N3JrYWNnenBhcmNncGczYWN4d2M0Z213anotcGNjX2R4Zi9DTFUtQVVEMS1BUkMtQXVkaXRvcml1bS1QMi1GaW5hbC0yLnJ2dA';
        
        launchViewer('forgeViewer', docId);
    }

    render(){
        return(
            <div id="forgeViewer">
            </div>
           
        )
    }
}

export default Viewer;