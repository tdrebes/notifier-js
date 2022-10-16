const { Menu, nativeImage, Tray: ElectronTray } = require('electron');
const { EventEmitter } = require('events');
const path = require('path')

class Tray {
    eventEmitter = new EventEmitter();
    electronTray;
    applicationVersion = 'Version: 0.1.0';
    trayIcon = nativeImage.createFromPath(path.join(__dirname, './resources/notification.png')).resize({height: 32, width: 32});

    render() {
        if (this.electronTray === undefined) {
            this.electronTray = this.createElectronTray(this.trayIcon);
        }

        this.electronTray.setImage(this.trayIcon);
    }

    createElectronTray(icon) {
        const electronTray = new ElectronTray(icon);

        const contextMenuConfig = [
            {
                enabled: false,
                type: 'normal',
                label: 'Notifier',
                sublabel: this.applicationVersion,
            },
            {
                type: 'separator'
            },
            {
                type: 'normal',
                label: 'Create Test-Notification (Windows)',
                click: this.onCreateTestNotificationWindowsClicked.bind(this)
            },
            {
                type: 'normal',
                label: 'Create Test-Notification',
                click: this.onCreateTestNotificationClicked.bind(this)
            },
            {
                type: 'separator'
            },
            {
                type: 'normal',
                label: 'Exit',
                click: this.onExitClicked.bind(this)
            }
        ];

        const contextMenu = Menu.buildFromTemplate(contextMenuConfig);

        electronTray.setContextMenu(contextMenu);
        electronTray.on('click', () => {
            electronTray.popUpContextMenu();
        });

        return electronTray;
    }

    on(eventName, callback) {
        return this.eventEmitter.on(eventName, callback)
    }

    onExitClicked() {
        this.eventEmitter.emit('exit');
    }

    onCreateTestNotificationClicked() {
        this.eventEmitter.emit('create-test-notification');
    }
    
    onCreateTestNotificationWindowsClicked() {
        this.eventEmitter.emit('create-test-notification-windows');
    }
}

module.exports = Tray;