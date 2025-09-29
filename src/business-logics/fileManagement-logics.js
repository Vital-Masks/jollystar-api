
const { resolve } = require('path');
const fileManagementCollection = require('../persistence/fileManagement-collection')
const fs = require("fs");
const { rejects } = require('assert');
    var fileManagementLogics = {

        createFileManagement:async function (fileManagementObj) {
            return fileManagementCollection.createFileManagement(fileManagementObj)         
        },

        getFileByFileId: function (fileManagementId){
            return fileManagementCollection.getfileManagementById(fileManagementId)
        },

        getAllfileManagements: function (){
            return fileManagementCollection.getAllfileManagements()
        },

        deleteFile: function (file) {
            return new Promise((resolve, reject) => {
                fs.unlink(file, (err) => {
                    if (err) {
                        console.error(err);
                        reject(new Error("Failed to delete file"))
                    }
                    else{
                        resolve()
                    }
                })
            })
        },

        updatefileManagementData: function(fileManagementId,updateData){
            return fileManagementCollection.updatefileManagementData(fileManagementId,updateData)
        },

        softDelete: function (fileId){
            return fileManagementCollection.softDelete(fileId)
        },
    }
    module.exports = fileManagementLogics