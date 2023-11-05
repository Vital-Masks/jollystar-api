module.exports = function ({ mongoose }) {
    const fileManagementSchema = new mongoose.Schema({
        title: { type: String, required: false },
        description: { type: String, required: false },
        file: { type: Object, required: false },
        isDeleted: { type: Boolean, required: false },  
    },
        {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
    })

    fileManagementSchema.plugin(require('mongoose-autopopulate'));

    const fileManagementModel = mongoose.model('fileManagements', fileManagementSchema)

    return{
        createFileManagement: function(doc){
            const newfileManagementReqObj = new fileManagementModel(doc)
            return newfileManagementReqObj.save().then(result=>{ 
                return result
            }).catch(error=>{
                let err = new Error(error);
                err.code = "M"+ error.code;
                throw err
            })
        },

        getfileManagementById: function(fileManagementId){
            return fileManagementModel.findById(fileManagementId).then(result=>{
                return result
            }).catch(error=>{
                let err = new Error(error);
                throw err
            })         
        },


        getAllfileManagements: function(){
            return fileManagementModel.find().then(result=>{
                return result
            }).catch(error=>{
                let err = new Error(error);
                throw err
            })         
        },

        updatefileManagementData: function(fileManagementId,updateData){
            return fileManagementModel.findOneAndUpdate({ _id: fileManagementId }, updateData,{ returnDocument: 'after' }).then(response=>{
                return response
            }).catch(error=>{
                let err = new Error(error);
                throw err
            })        
        },

        softDelete: function(fileManagementId){
            return fileManagementModel.findOneAndUpdate({ _id: fileManagementId }, {isDeleted: true}).then(response=>{
                return response
            }).catch(error=>{
                let err = new Error(error);
                throw err
            })        
        }
    }
}