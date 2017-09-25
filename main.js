'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

var ipc = require('ipc');

ipc.on('close-main-window', function () {
    app.quit();
});

ipc.on('image-changed', function(sender, fileName) {
	//console.log('on image-changed  with ' + JSON.stringify(arguments));
	mainWindow.setTitle(fileName);
});

ipc.on('exit-full-screen', function() {
    if (mainWindow.isFullScreen()) {
        mainWindow.setFullScreen(false);
    }
});

ipc.on('enter-full-screen', function() {
    if (!mainWindow.isFullScreen()) {
        mainWindow.setFullScreen(true);
    }
});

ipc.on('toggle-full-screen', function() {
    if (mainWindow.isFullScreen()) {
        mainWindow.setFullScreen(false);
    } else {
        mainWindow.setFullScreen(true);
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        //frame: false,
        resizable: true,
        height: 600,
        width: 800
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
});

