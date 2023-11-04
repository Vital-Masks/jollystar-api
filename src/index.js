module.exports = function run({ initiateModule, container }) {
  initiateModule(initiateModule, "initiateModule");
  initiateModule(container, "container");

  var cors = container.resolve("cors");
  var bodyParser = container.resolve("bodyParser");
  var express = container.resolve("express");

  var app = container.resolve("app");

  var url = 'mongodb+srv://jollystarDb:jollystarDb%402023@jollystarcluster.awkbybu.mongodb.net/Jollystar?retryWrites=true&w=majority';
  // initiateAwsServices()
  initiateMongoDB().then(res => {
    return initiateRoutes();
  }).then(res => {
    return serve()
  }).catch(err => {
    console.log("App Initiation Issue", err)
  })


  function initiateMongoDB() {
    const mongoose = require('mongoose');
    mongoose.set('strictQuery', true);
    return mongoose.connect(url).then(res => {
      console.log("Mongi DB - connected @");
      return res
    });
  }

  function initiateRoutes() {
    useInitialMiddlewares();
    setMainRoutes();

    function useInitialMiddlewares() {
      app.use(cors());

      app.use(cors({
        origin:['http://localhost:3000']
      }))
      app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        res.header("Access-Control-Allow-Credentials", true);
        next();
      })

      // fixing "413 Request Entity Too Large" errors
      // app.use(express.json({ limit: '500mb', extended: true }));
      app.use(express.json({ limit: '500mb', extended: true }));
      app.use(
        express.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 })
      );
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 }));
    }

    function setMainRoutes() {

      app.get('/', (req, res) => {
        res.status(200).send('ticketraa APIs!');
      });

      var commonrouter = container.resolve("router");
      app.use('/api/', commonrouter);
      console.log("Main Routes successfully plugged");
    }

  }

  // function initiateAwsServices(){
  //   awsInitiation();
  //   initiateCognitoIdentity();
  //   initiateCognitoIdentityServiceProvider()
  //   console.log("Main : AWS Services Initiated")
  // }

  // function awsInitiation(){
  //   var aws = container.resolve("aws");

  //   aws.config.update({
  //     region: 'us-east-1',
  //     accessKeyId:'AKIAQPC54C4F53M267N2',
  //     secretAccessKey: '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'
  //   })
  // }

  // function initiateCognitoIdentity(){
  //   var aws = container.resolve("aws");
  //   const cognitoIdentity = new aws.CognitoIdentity();
  //   initiateModule(cognitoIdentity,"cognitoIdentity")
  // }

  // function initiateCognitoIdentityServiceProvider(){
  //   var aws = container.resolve("aws");
  //   const cognitoIdentityProvider = new aws.CognitoIdentityServiceProvider()
  //   initiateModule(cognitoIdentityProvider,"cognitoIdentityProvider")
  // }

  function serve() {
    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
      console.log('Server running on ' + PORT);
    });
  }

}(require("./scripts/depandancy-injector"))
