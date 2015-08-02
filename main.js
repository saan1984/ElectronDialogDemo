var application = require('app'),
    BrowserWindow = require('browser-window'),
    ipc = require('ipc');
application.on('ready', function() {
    var mainWindow = new BrowserWindow({
        width: 700,
        height: 600,
        center:true,
        title:"Electron Dialog Demo",
    });
    mainWindow.loadUrl('file://' + __dirname + '/main.html');
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});