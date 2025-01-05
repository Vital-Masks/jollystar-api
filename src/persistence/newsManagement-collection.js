const mongoose = require('mongoose')
    const newsManagementSchema = new mongoose.Schema({
        title: { type: String, required: false },
        description: { type: String, required: false },
        coverImage: { type: Object, required: false },
        gallery: [{ type: Object, required: false }],
        isDeleted: { type: Boolean, required: false , default: false },  
    },
        {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
    })

    newsManagementSchema.plugin(require('mongoose-autopopulate'));

    const newsManagementModel = mongoose.model('newsManagements', newsManagementSchema)

    var newsManagementCollection = {
        createNewsManagement: function(doc){
            const newnewsManagementReqObj = new newsManagementModel(doc)
            return newnewsManagementReqObj.save().then(result=>{ 
                return result
            }).catch(error=>{
                let err = new Error(error);
                err.code = "M"+ error.code;
                throw err
            })
        },

        getnewsManagementById: function(newsManagementId){
            return newsManagementModel.findById(newsManagementId).then(result=>{
                return result
            }).catch(error=>{
                let err = new Error(error);
                throw err
            })         
        },


        getAllnewsManagements: function(){
            return newsManagementModel.find().sort({ created_at: -1 }).then(result=>{
                return result
            }).catch(error=>{
                let err = new Error(error);
                throw err
            })         
        },

        updatenewsManagementData: function(newsManagementId, updateData) {
        
            return newsManagementModel.findOneAndUpdate(
                { _id: newsManagementId },
                updateData,
                { returnDocument: 'after' }
            )
            .then(response => {
                return response;
            })
            .catch(error => {
                let err = new Error(error);
                throw err;
            });
        },
        

        softDelete: function(newsManagementId) {
            return newsManagementModel.deleteOne({ _id: newsManagementId })
                .then(response => {
                    return response;
                })
                .catch(error => {
                    let err = new Error(error);
                    throw err;
                });
        }   
    }
module.exports = newsManagementCollection