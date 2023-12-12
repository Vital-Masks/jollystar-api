module.exports = function({newsManagementCollection, config, aws}){
    return {

        createNewsManagement:async function (newsManagementObj) {
            return newsManagementCollection.createNewsManagement(newsManagementObj)         
        },

        getNewsByNewsId: function (newsManagementId){
            return newsManagementCollection.getnewsManagementById(newsManagementId)
        },

        getAllnewsManagements: function (){
            return newsManagementCollection.getAllnewsManagements()
        },

        updatenewsManagementData: function(newsManagementId,updateData){
            return newsManagementCollection.updatenewsManagementData(newsManagementId,updateData)
        },

        softDelete: function (newsManagementId){
            return newsManagementCollection.softDelete(newsManagementId)
        },
    }
}