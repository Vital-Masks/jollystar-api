const mongoose = require('mongoose')
    const fileManagementSchema = new mongoose.Schema({
        title: { type: String, required: false },
        description: { type: String, required: false },
        file: { type: Object, required: false },
        isDeleted: { type: Boolean, required: false , default: false},  
    },
        {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
    })

    fileManagementSchema.plugin(require('mongoose-autopopulate'));

    const fileManagementModel = mongoose.model('fileManagements', fileManagementSchema)

    var fileManagementCollection = {
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
            return fileManagementModel.findOne({ _id: fileManagementId, isDeleted: { $ne: true } }).lean().then(result=>{
                return result
            }).catch(error=>{
                let err = new Error(error);
                throw err
            })         
        },


        getAllfileManagements: function(){
            return fileManagementModel.find({ isDeleted: { $ne: true } }).sort({ created_at: -1 }).then(result=>{
                return result
            }).catch(error=>{
                let err = new Error(error);
                throw err
            })         
        },

        updatefileManagementData: function(fileManagementId, updateData) {
            // Destructure updateData to get title, description, and file
            const { title, description, file } = updateData;
        
            // If the file field is provided, update it accordingly
            const updateObject = {};
            if (title) updateObject.title = title;
            if (description) updateObject.description = description;
            if (file) updateObject.file = file;
        
            return fileManagementModel.findOneAndUpdate(
                { _id: fileManagementId },
                updateObject,
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
        

        softDelete: function(fileManagementId) {
            return fileManagementModel.findOneAndUpdate(
                { _id: fileManagementId },
                { isDeleted: true },
                { returnDocument: 'after' }
            )
                .then(response => {
                    return response;
                })
                .catch(error => {
                    let err = new Error(error);
                    throw err;
                });
        }
        
        
        
    }
    module.exports = fileManagementCollection