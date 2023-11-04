module.exports = class Router{
    constructor({
        memberController,
        express
    }){
        let router = new express.Router();

        router.use('/member',memberController);


        return router
    }

    
}