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
      
      // File filter for validation
      const fileFilter = (req, file, cb) => {
        // Define allowed file types
        const allowedTypes = [
          'image/jpeg',
          'image/jpg', 
          'image/png',
          'image/gif',
          'application/pdf',
          'text/plain',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type. Only images, PDFs, and documents are allowed.'), false);
        }
      };
      
      const upload = multer({ 
        storage: storage,
        fileFilter: fileFilter,
        limits: {
          fileSize: 10 * 1024 * 1024 // 10MB limit
        }
      })

    // Error handling middleware for multer
    const handleMulterError = (err, req, res, next) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).send({ "error": "File too large. Maximum size is 10MB." });
            }
            return res.status(400).send({ "error": err.message });
        } else if (err) {
            return res.status(400).send({ "error": err.message });
        }
        next();
    };

    expressRouter.post('', upload.single("file"), handleMulterError, createFileManagement);
    expressRouter.get('/getAllFiles', getAllFileManagements);
    expressRouter.get('/:fileId', getFileByFileId);
    expressRouter.put('/:fileId', upload.single('file'), handleMulterError, updateFileManagement);
    expressRouter.delete('/delete/:fileId', deleteFileManagement);

    function createFileManagement(req, res, next) {
        try {
            // Check if file was uploaded
            if (!req.file) {
                return res.status(400).send({ "error": "No file uploaded" });
            }

            let { body } = req;
            let parsedBody = {};
            
            // Safely parse body.body if it exists
            if (body && body.body) {
                try {
                    parsedBody = JSON.parse(body.body);
                } catch (parseError) {
                    return res.status(400).send({ "error": "Invalid JSON in request body" });
                }
            }
            
            // Add file information
            parsedBody.file = req.file.filename;
            console.log('Creating file management:', parsedBody);

            fileManagementLogics.createFileManagement(parsedBody).then((result) => {
                res.status(201).send({ "status": "File Saved Successfully", "result": result });
            }).catch((err) => {
                return next(commons.errorHandler(err));
            });
        } catch (error) {
            console.error('Error in createFileManagement:', error);
            return next(commons.errorHandler(error));
        }
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
            let { body } = req;
            
            // Get existing file data
            let existingFileData = await fileManagementLogics.getFileByFileId(fileId);
            if (!existingFileData) {
                return res.status(404).send({ "error": "File not found" });
            }
            
            let parsedBody = {};
            
            // Safely parse body.body if it exists
            if (body && body.body) {
                try {
                    parsedBody = JSON.parse(body.body);
                } catch (parseError) {
                    return res.status(400).send({ "error": "Invalid JSON in request body" });
                }
            }
            
            // Handle file update
            if (req.file) {
                // New file uploaded - delete old file and use new one
                try {
                    await fileManagementLogics.deleteFile('files/' + existingFileData.file);
                } catch (deleteError) {
                    console.warn('Could not delete old file:', deleteError.message);
                }
                parsedBody.file = req.file.filename;
            }
            // If no new file uploaded, keep existing file (don't update file field)
            
            // Update file data
            const result = await fileManagementLogics.updatefileManagementData(fileId, parsedBody);
            console.log('Update successful:', result);
            res.status(200).send({ "result": result });
            
        } catch (error) {
            console.error('Error updating file:', error);
            return next(commons.errorHandler(error));
        }
    }
    

async function deleteFileManagement(req, res, next) {
    try {
        const { params: { fileId } } = req;
        console.log('Deleting file with ID:', fileId);
        
        let existingFileData = await fileManagementLogics.getFileByFileId(fileId);
        
        if (existingFileData && existingFileData.file) {
            // Delete the physical file first
            await fileManagementLogics.deleteFile('files/' + existingFileData.file);
            
            // Then perform soft delete in database
            const result = await fileManagementLogics.softDelete(fileId);
            console.log('Soft delete result:', result);
            res.status(200).send({ "result": result });
        } else {
            res.status(404).send({ "result": "File data already deleted or does not exist" });
        }
    } catch (err) {
        console.error('Error during file deletion:', err);
        return next(commons.errorHandler(err));
    }
}
    
module.exports = expressRouter