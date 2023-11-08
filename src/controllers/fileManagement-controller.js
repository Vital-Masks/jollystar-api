module.exports = function ({ express, fileManagementLogics, commons, multer }) {
    this.expressRouter = new express.Router({ mergeParams: true });

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

    this.expressRouter.post('', upload.single("file"), createFileManagement);
    this.expressRouter.get('/getAllFiles', getAllFileManagements);
    this.expressRouter.get('/:fileId', getFileByFileId);
    this.expressRouter.put('/:fileId', updateFileManagement);
    this.expressRouter.put('/delete/:fileId', deleteFileManagement);

    return this.expressRouter



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
        const { params: { fileId } } = req
        const { body } = req
        fileManagementLogics.updatefileManagementData(fileId, body).then(result => {
            res.send({ "result": result })
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    function deleteFileManagement(req, res, next) {
        const { params: { fileId } } = req
        fileManagementLogics.softDelete(fileId).then(result => {
            res.send({ "result": result })
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }
}