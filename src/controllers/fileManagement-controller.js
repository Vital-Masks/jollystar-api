module.exports = function ({ express, fileManagementLogics, commons }) {
    this.expressRouter = new express.Router({ mergeParams: true });

    this.expressRouter.post('', createFileManagement);
    this.expressRouter.get('/getAllFiles', getAllFileManagements);
    this.expressRouter.get('/:fileId', getFileByFileId);
    this.expressRouter.put('/:fileId', updateFileManagement);
    this.expressRouter.put('/delete/:fileId', deleteFileManagement);

    return this.expressRouter

    function createFileManagement(req, res, next) {
        const { body } = req

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