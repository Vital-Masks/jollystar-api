module.exports = class Router{
    constructor({
        memberController,
        fileManagementController,
        express
    }){
        let router = new express.Router();

        router.use('/member',memberController);
        router.use('/fileManagement',fileManagementController);


        return router
    }

    
}