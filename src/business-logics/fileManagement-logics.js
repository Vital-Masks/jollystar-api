module.exports = function({fileManagementCollection, config, aws}){
    return {

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
            return fileManagementCollection.softDelete(fileId)
        },
    }
}