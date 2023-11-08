module.exports = function loadModules(awilix){ 

    let container = awilix.createContainer({
        resolutionMode: awilix.InjectionMode.PROXY
    })

    container.register({
        awilix: awilix.asValue(require('awilix')),
        express: awilix.asValue(require('express')),
        app: awilix.asValue(require('express')()),
        bodyParser: awilix.asValue(require('body-parser')),
        aws: awilix.asValue(require('aws-sdk')),
        mongoose: awilix.asValue(require('mongoose')),
        mongodb: awilix.asValue(require('mongodb')),
        cors: awilix.asValue(require('cors')),
        multer: awilix.asValue(require('multer')),
        mongooseAutopopulate: awilix.asValue(require('mongoose-autopopulate')),
    })


    container.loadModules([
        ['src/server.js', { register: awilix.asClass, lifetime: awilix.Lifetime.SINGLETON }],
        ['src/controllers/*.js', { register: awilix.asClass, lifetime: awilix.Lifetime.SINGLETON }],
        ['src/business-logics/*.js', { register: awilix.asClass }],
        ['src/config/*.js', { register: awilix.asClass }],
        ['src/utils/*.js', { register: awilix.asClass }],
        ['src/persistence/*.js', { register: awilix.asClass }],
        ['src/router.js', { register: awilix.asClass, lifetime: awilix.Lifetime.SINGLETON }],
        ['src/middlewares/*', { register: awilix.asClass }],
    ], {
        formatName: 'camelCase',
        resolverOptions: {
            lifetime: awilix.Lifetime.SINGLETON
        }
    })

    // function snackToCamel(s){
    //     return s.replace(/(\-\w)/g, function(m){
    //         return m[1].toUpperCase
    //     })
    // }








    return{container, 
        initiateModule:function (module,moduleName){
        var diObj = {}
        diObj[moduleName] = awilix.asValue(module);
        container.register(diObj)
    }}

   

}(require('awilix'))