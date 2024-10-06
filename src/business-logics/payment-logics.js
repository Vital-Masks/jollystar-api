
const paymentCollection = require('../persistence/payment-collection')
    var paymentLogics =  {

        createPayment:async function (paymentObj) {
            // let email = paymentObj.email.trim()
            // let password = paymentObj.password.trim()
            // let PaymentName = email.split("@")[0]

                    return paymentCollection.createPayment(paymentObj)
         
        },

        getPaymentById: function (paymentId){
            return paymentCollection.getpaymentById(paymentId)
        },

        getPaymentByMemberId: function (MemberId){
            return paymentCollection.getPaymentByMemberId(MemberId)
        },

        // getPaymentByEmail: function (email){
        //     return paymentCollection.getPaymentByEmail(email)
        // },

        getAllpayments: function (){
            return paymentCollection.getAllpayments()
        }
    }
module.exports = paymentLogics