    const express = require('express');
    const galleryManagementLogics = require('../business-logics/galleryManagement-logics')
    const commons = require('../utils/commons')
    expressRouter = express.Router();

    expressRouter.post('', createGalleryManagement);
    expressRouter.get('/getAllGallery', getAllGalleryManagements);
    expressRouter.get('/:galleryId', getGalleryByGalleryId);
    expressRouter.put('/:galleryId', updateGalleryManagement);
    expressRouter.delete('/:galleryId', deleteGalleryManagement);
    
    function createGalleryManagement(req, res, next) {
        const { body } = req

        galleryManagementLogics.createGalleryManagement(body).then((result) => {
            res.send({ "status": "Gallery Management Saved Successfully", "result": result });
            next();
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    function getAllGalleryManagements(req, res, next) {
        galleryManagementLogics.getAllgalleryManagements().then(result => {
            res.send({ "result": result })
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    function getGalleryByGalleryId(req, res, next){
        const {params : {galleryId}}= req
        galleryManagementLogics.getGalleryByGalleryId(galleryId).then(result => {
            if(result && result._id){
            res.send({ "result": result})
            }
            else {res.send({ "result": {}})}
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    function updateGalleryManagement(req, res, next) {
        try {
            const { params: { galleryId } } = req;
            const { body } = req;
                galleryManagementLogics.updategalleryManagementData(galleryId,body)
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

    function deleteGalleryManagement(req, res, next) {
        const { params: { galleryId } } = req;
        console.log('Deleting file with ID:', galleryId);
    
        galleryManagementLogics.softDelete(galleryId)
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