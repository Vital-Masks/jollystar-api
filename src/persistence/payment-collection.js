const mongoose = require('mongoose')
    const paymentSchema = new mongoose.Schema({
        memberId: { type: mongoose.Schema.ObjectId, ref: 'members', required: false, autopopulate: true },
        bank: { type: String, required: false },
        branch: { type: String, required: false },
        total: { type: String, required: false },
        date: { type: String, required: false },
        membershipCategory:{ type: String, required: false },
        paymentSlip: { type: Object, required: false }
    },
        {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
    })

    paymentSchema.plugin(require('mongoose-autopopulate'));

    const paymentModel = mongoose.model('payments', paymentSchema)

    var paymentCollection ={
        createPayment: function(doc){
            const newpaymentReqObj = new paymentModel(doc)
            return newpaymentReqObj.save().then(result=>{ 
                return result
            }).catch(error=>{
                let err = new Error(error);
                err.code = "M"+ error.code;
                throw err
            })
        },

        getPaymentByPaymentId: function(paymentId){
            return paymentModel.findById(paymentId).then(result=>{
                return result
            }).catch(error=>{
                let err = new Error(error);
                throw err
            })         
        },
        getPaymentByMemberId: function(MemberId){
            return paymentModel.find({memberId: MemberId}).lean().then(result=>{
                return result
            }).catch(error=>{
                let err = new Error(error);
                throw err
            })         
        },


        getAllpayments: function(){
            return paymentModel.find().then(result=>{
                return result
            }).catch(error=>{
                let err = new Error(error);
                throw err
            })         
        },

        // getPaymentByEmail: function(email){
        //     return paymentModel.find({email:email}).then(result=>{
        //         return result
        //     }).catch(error=>{
        //         let err = new Error(error);
        //         throw err
        //     })    
        // },

        updatepaymentData: function(paymentId,updateData){
            return paymentModel.findOneAndUpdate({ _id: paymentId }, updateData,{ returnDocument: 'after' }).then(response=>{
                return response
            }).catch(error=>{
                let err = new Error(error);
                throw err
            })        
        }
    }
module.exports = paymentCollection