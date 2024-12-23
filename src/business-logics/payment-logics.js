
const paymentCollection = require('../persistence/payment-collection')
    var paymentLogics =  {

        createPayment:async function (paymentObj) {
                    return paymentCollection.createPayment(paymentObj)        
        },

        getPaymentByPaymentId: function (paymentId){
            return paymentCollection.getPaymentByPaymentId(paymentId)
        },

        getPaymentByMemberId: function (MemberId){
            return paymentCollection.getPaymentByMemberId(MemberId)
        },

        getAllpayments: function (){
            return paymentCollection.getAllpayments()
        }
    }
module.exports = paymentLogics