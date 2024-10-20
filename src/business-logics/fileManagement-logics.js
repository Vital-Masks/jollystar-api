
const fileManagementCollection = require('../persistence/fileManagement-collection')
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

        updatefileManagementData: function(fileManagementId,updateData){
            return fileManagementCollection.updatefileManagementData(fileManagementId,updateData)
        },

        softDelete: function (fileId){
            console.log("zxcz",fileId)
            return fileManagementCollection.softDelete(fileId)
        },
    }
    module.exports = fileManagementLogics