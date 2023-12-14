module.exports = class Router{
    constructor({
        memberController,
        fileManagementController,
        newsManagementController,
        galleryManagementController,
        express
    }){
        let router = new express.Router();

        router.use('/member',memberController);
        router.use('/fileManagement',fileManagementController);
        router.use('/newsManagement',newsManagementController);
        router.use('/galleryManagement',galleryManagementController);


        return router
    }

    
}