module.exports = function () {
    let awsConfigs =  require('../../src/config/aws-configs.json')
    const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
    var AWS = require('aws-sdk');

    var config = {
        awsConfigs: require('./aws-configs.json')
    }
    return {
        getAwsConfigs: function () {
            return "config.awsConfigs"
        },

        registerCognitoMember: function ( userName, email, password) {
            var poolData = {
                MemberPoolId: awsConfigs.aws_user_pool_id,
                ClientId: awsConfigs.aws_user_pools_web_client_id
            };
            var attribute_list = [];

            attribute_list.push(new AmazonCognitoIdentity.CognitoMemberAttribute({Name: 'email',Value: email}));

            var userPool = new AmazonCognitoIdentity.CognitoMemberPool(poolData);

            return new Promise((resolve, reject) => {
                userPool.signUp(userName, password, attribute_list, null, (err, result) => {
                    if (err) {
                        let error = new Error()
                        error.stack = err
                        reject(error);

                    }
                    else{
                        cognitoMember = result.user;
                        resolve(cognitoMember)
                    }
                    
                });
            });
        },
    }
}