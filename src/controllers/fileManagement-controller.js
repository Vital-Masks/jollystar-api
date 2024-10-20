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
    expressRouter.put('/:fileId', updateFileManagement);
    expressRouter.delete('/delete/:fileId', deleteFileManagement);

    function createFileManagement(req, res, next) {
        const { body } = req
        body.file = req.file.filename
       

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

    function updateFileManagement(req, res, next) {
        try {
            const { params: { fileId } } = req;
    
            console.log('Received PUT request for fileId:', fileId);
    
            // Use the multer middleware to handle the file
            upload.single('file')(req, res, async function (err) {
                if (err) {
                    console.error('Error handling file upload:', err);
                    return next(err);
                }
    
                console.log('req.body:', req.body); // Log the request body
                console.log('req.file:', req.file); // Log the uploaded file information
    
                const { title, description } = req.body;
    
                // Check if req.file is present and update file information
                const fileUpdate = req.file ? { file: req.file.filename } : {};
    
                // Rest of your code for updating file data
                fileManagementLogics.updatefileManagementData(fileId, { title, description, ...fileUpdate })
                    .then(result => {
                        console.log('Update successful:', result);
                        res.send({ "result": result });
                    })
                    .catch((err => {
                        console.error('Error updating file:', err);
                        return next(commons.errorHandler(err));
                    }));
            });
        } catch (error) {
            console.error('Error updating file:', error);
            return next(commons.errorHandler(error));
        }
    }
    

    function deleteFileManagement(req, res, next) {
        const { params: { fileId } } = req;
        console.log('Deleting file with ID:', fileId);
    
        fileManagementLogics.softDelete(fileId)
            .then(result => {
                console.log('Soft delete result:', result);
                res.send({ "result": result });
            })
            .catch(err => {
                console.error('Error during soft delete:', err);
                return next(commons.errorHandler(err));
            });
    }
    
module.exports = expressRouter