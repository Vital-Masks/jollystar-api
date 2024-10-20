const galleryManagementCollection = require('../persistence/galleryManagement-collection')
    var galleryManagementLogics = {

        createGalleryManagement:async function (galleryManagementObj) {
            return galleryManagementCollection.createGalleryManagement(galleryManagementObj)         
        },

        getGalleryByGalleryId: function (galleryManagementId){
            return galleryManagementCollection.getgalleryManagementById(galleryManagementId)
        },

        getAllgalleryManagements: function (){
            return galleryManagementCollection.getAllgalleryManagements()
        },

        updategalleryManagementData: function(galleryManagementId,updateData){
            return galleryManagementCollection.updategalleryManagementData(galleryManagementId,updateData)
        },

        softDelete: function (galleryManagementId){
            return galleryManagementCollection.softDelete(galleryManagementId)
        },
    }
module.exports = galleryManagementLogics