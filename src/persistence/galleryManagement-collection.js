module.exports = function ({ mongoose }) {
    const galleryManagementSchema = new mongoose.Schema({
        albumName: { type: String, required: false },
        description: { type: String, required: false },
        coverImage: { type: Object, required: false },
        albumLink: { type: String, required: false },
        isDeleted: { type: Boolean, required: false , default: false },  
    },
        {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
    })

    galleryManagementSchema.plugin(require('mongoose-autopopulate'));

    const galleryManagementModel = mongoose.model('galleryManagements', galleryManagementSchema)

    return{
        createGalleryManagement: function(doc){
            const newgalleryManagementReqObj = new galleryManagementModel(doc)
            return newgalleryManagementReqObj.save().then(result=>{ 
                return result
            }).catch(error=>{
                let err = new Error(error);
                err.code = "M"+ error.code;
                throw err
            })
        },

        getgalleryManagementById: function(galleryManagementId){
            return galleryManagementModel.findById(galleryManagementId).then(result=>{
                return result
            }).catch(error=>{
                let err = new Error(error);
                throw err
            })         
        },


        getAllgalleryManagements: function(){
            return galleryManagementModel.find().then(result=>{
                return result
            }).catch(error=>{
                let err = new Error(error);
                throw err
            })         
        },

        updategalleryManagementData: function(galleryManagementId, updateData) {
        
            return galleryManagementModel.findOneAndUpdate(
                { _id: galleryManagementId },
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
        

        softDelete: function(galleryManagementId) {
            return galleryManagementModel.deleteOne({ _id: galleryManagementId })
                .then(response => {
                    return response;
                })
                .catch(error => {
                    let err = new Error(error);
                    throw err;
                });
        }   
    }
}