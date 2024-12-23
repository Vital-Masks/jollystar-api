
const express = require('express');
const router = express.Router()
var memberController = require('./controllers/member-controller.js');
var fileManagementController = require('./controllers/fileManagement-controller.js');
var newsManagementController = require('./controllers/newsManagement-controller.js');
var galleryManagementController = require('./controllers/galleryManagement-controller.js');
var paymentController = require('./controllers/payment-controller.js')


router.use('/member',memberController);
router.use('/fileManagement',fileManagementController);
router.use('/newsManagement',newsManagementController);
router.use('/galleryManagement',galleryManagementController);
router.use('/payment',paymentController);


module.exports = router
