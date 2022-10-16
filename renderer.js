const { ipcRenderer } = require('electron');

ipcRenderer.send('log', 'Renderer initialized.');

document.getElementById('action_close').addEventListener('click', () => {
    ipcRenderer.send('action_close');
})