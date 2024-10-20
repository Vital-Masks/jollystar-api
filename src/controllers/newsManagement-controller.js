
    const express = require('express');
    const newsManagementLogics = require('../business-logics/newsManagement-logics')
    const commons = require('../utils/commons')
    expressRouter = express.Router();


    expressRouter.post('', createNewsManagement);
    expressRouter.get('/getAllNews', getAllNewsManagements);
    expressRouter.get('/:newsId', getNewsByNewsId);
    expressRouter.put('/:newsId', updateNewsManagement);
    expressRouter.delete('/:newsId', deleteNewsManagement);

    
    function createNewsManagement(req, res, next) {
        const { body } = req

        newsManagementLogics.createNewsManagement(body).then((result) => {
            res.send({ "status": "News Management Saved Successfully", "result": result });
            next();
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    function getAllNewsManagements(req, res, next) {
        newsManagementLogics.getAllnewsManagements().then(result => {
            res.send({ "result": result })
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    function getNewsByNewsId(req, res, next){
        const {params : {newsId}}= req
        newsManagementLogics.getNewsByNewsId(newsId).then(result => {
            if(result && result._id){
            res.send({ "result": result})
            }
            else {res.send({ "result": {}})}
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    function updateNewsManagement(req, res, next) {
        try {
            const { params: { newsId } } = req;
            const { body } = req;
                newsManagementLogics.updatenewsManagementData(newsId,body)
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

    function deleteNewsManagement(req, res, next) {
        const { params: { newsId } } = req;
        console.log('Deleting file with ID:', newsId);
    
        newsManagementLogics.softDelete(newsId)
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