/* global Autodesk, THREE */

export class TestListPanel extends Autodesk.Viewing.UI.PropertyPanel {
    constructor(viewer, container, id, title, options) {
        super(container, id, title, options);
    }

    initialize(){
        this.title = this.createTitleBar(this.titleLabel || this.container.id);
        this.initializeMoveHandlers(this.title);
        this.container.appendChild(this.title);
        this.createFooter();
        this.createCloseButton();
        // Create a container for the list
        const content = document.createElement('div');
        content.style.height = '350px';
        content.style.backgroundColor = 'rgba(34,34,34,.9)';
        // this.content.innerHTML = `<div class="datagrid-container" style="position: relative; height: 350px;"></div>`;

        // Create an array of users
        const users = ['User 1', 'User 2', 'User 3', 'User 4'];

        // Loop through the users array and create a list item for each user
        users.forEach(user => {
            const listItem = document.createElement('div');
            const textNode = document.createTextNode(user);
            listItem.appendChild(textNode);
            content.appendChild(listItem);
        });

        // Append the container to the panel's content container
        this.container.appendChild(content);
    }
}

