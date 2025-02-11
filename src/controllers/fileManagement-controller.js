const express = require('express');
const fileManagementLogics = require('../business-logics/fileManagement-logics')
const commons = require('../utils/commons')
const multer = require('multer')

expressRouter = express.Router();

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './files')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() 
          cb(null, uniqueSuffix + '-' + file.originalname)
        }
      })
      
      const upload = multer({ storage: storage })

    expressRouter.post('', upload.single("file"), createFileManagement);
    expressRouter.get('/getAllFiles', getAllFileManagements);
    expressRouter.get('/:fileId', getFileByFileId);
    expressRouter.put('/:fileId', upload.single('file'),updateFileManagement);
    expressRouter.delete('/delete/:fileId', deleteFileManagement);

    function createFileManagement(req, res, next) {
        let { body } = req
        body = JSON.parse(body.body)
        body.file = req.file.filename
        console.log(body)

        fileManagementLogics.createFileManagement(body).then((result) => {
            res.send({ "status": "Company Request Saved Successfully", "result": result });
            next();
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    function getAllFileManagements(req, res, next) {
        fileManagementLogics.getAllfileManagements().then(result => {
            res.send({ "result": result })
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    function getFileByFileId(req, res, next){
        const {params : {fileId}}= req
        fileManagementLogics.getFileByFileId(fileId).then(result => {
            if(result && result._id){
            res.send({ "result": result})
            }
            else {res.send({ "result": {}})}
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    async function updateFileManagement(req, res, next) {
        try {
            const { params: { fileId } } = req;
            let { body } = req
            let existingFileData = await fileManagementLogics.getFileByFileId(fileId)
            await fileManagementLogics.deleteFile('files/'+existingFileData.file)
                body = JSON.parse(body.body)
                body.file = req.file ? req.file.filename : ""
   
                // Rest of your code for updating file data
                fileManagementLogics.updatefileManagementData(fileId, body)
                    .then(result => {
                        console.log('Update successful:', result);
                        res.send({ "result": result });
                    })
                    .catch((err => {
                        console.error('Error updating file:', err);
                        return next(commons.errorHandler(err));
                    }));
        } catch (error) {
            console.error('Error updating file:', error);
            return next(commons.errorHandler(error));
        }
    }
    

async function deleteFileManagement(req, res, next) {
    const { params: { fileId } } = req;
    console.log('Deleting file with ID:', fileId);
    let existingFileData = await fileManagementLogics.getFileByFileId(fileId)
    if (existingFileData && existingFileData.file) {
        fileManagementLogics.deleteFile('files/' + existingFileData.file).then(res=>{
            fileManagementLogics.softDelete(fileId)
            .then(result => {
                console.log('Soft delete result:', result);
                res.send({ "result": result });
            })
            .catch(err => {
                console.error('Error during soft delete:', err);
                return next(commons.errorHandler(err));
            });
        }).catch(err => {
            console.error('Error during soft delete:', err);
            return next(commons.errorHandler(err));
        });

        
    }else{
        res.send({ "result": "File data already delete or not exist" });
    }

   
}
    
module.exports = expressRouter