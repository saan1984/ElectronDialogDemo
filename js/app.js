var Remote = require('remote'),
    Dialog = Remote.require('dialog'),
    fs = require('fs'),
    util = require("util"),
    mime = require("mime"),
    browserWindow = Remote.getCurrentWindow(),
    imageHolder = document.getElementById("imageHolder");
//Method for reading file from path and rendering
var readFileFromSystem = function(imageFilePath){
    var dataInBase64 = null,
        imageBase64 = null,
        mimeType = mime.lookup(imageFilePath);
    fs.readFile(imageFilePath,
        function(error, data) {
        if (error) {
            throw error;
        } else{
            dataInBase64 = new Buffer(data).toString('base64');
            imageBase64 =  util.format("data:%s;base64,%s", mimeType, dataInBase64);
            imageHolder.src = imageBase64;
        }
    });
};
//Method to selected file path
var callbackSelectMethod = function(fileNameArray){
    var imageFilePath = null;
    if(typeof fileNameArray !== "undefined") {
        imageFilePath = fileNameArray[0];
        Dialog.showMessageBox({
            type:"info",
            buttons:['ok'],
            title:"Information on File Selection",
            message:"Selected File Path is: "+imageFilePath
        },function(){
            readFileFromSystem(imageFilePath);
        });
    }else{
        Dialog.showErrorBox("Error in Selecting File",
                "Reason: May be File is not selected");
    }
};
//Method for selecting image file
var selectImageFile = function(opcode){
    Dialog.showOpenDialog({
        title:"Select an image file.",
        properties:['openFile'],
        filters:[
            {name:'Images', extensions:['jpg', 'png', 'gif']}
        ]
    },callbackSelectMethod);
};