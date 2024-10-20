
const paymentCollection = require('../persistence/payment-collection')
    var paymentLogics =  {

        createPayment:async function (paymentObj) {
                    return paymentCollection.createPayment(paymentObj)        
        },

        getPaymentById: function (paymentId){
            return paymentCollection.getpaymentById(paymentId)
        },

        getPaymentByMemberId: function (MemberId){
            return paymentCollection.getPaymentByMemberId(MemberId)
        },

        getAllpayments: function (){
            return paymentCollection.getAllpayments()
        }
    }
module.exports = paymentLogics