
    const express = require('express');
    const paymentLogics = require('../business-logics/payment-logics')
    const commons = require('../utils/commons')
    expressRouter = express.Router();


    expressRouter.post('', createPayment);
    expressRouter.get('/getAllPayments', getAllPayments);
    expressRouter.get('/:paymentId', getPaymentByPaymentId);
    expressRouter.put('/:paymentId', updatePayment);
    expressRouter.delete('/:paymentId', deletePayment);

    
    function createPayment(req, res, next) {
        const { body } = req

        paymentLogics.createPayment(body).then((result) => {
            res.send({ "status": "Payment Saved Successfully", "result": result });
            next();
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    function getAllPayments(req, res, next) {
        paymentLogics.getAllpayments().then(result => {
            res.send({ "result": result })
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    function getPaymentByPaymentId(req, res, next){
        const {params : {paymentId}}= req
        paymentLogics.getPaymentByPaymentId(paymentId).then(result => {
            if(result && result._id){
            res.send({ "result": result})
            }
            else {res.send({ "result": {}})}
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    function updatePayment(req, res, next) {
        try {
            const { params: { paymentId } } = req;
            const { body } = req;
                paymentLogics.updatepaymentData(paymentId,body)
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

    function deletePayment(req, res, next) {
        const { params: { paymentId } } = req;
        console.log('Deleting file with ID:', paymentId);
    
        paymentLogics.softDelete(paymentId)
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