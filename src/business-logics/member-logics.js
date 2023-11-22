module.exports = function({memberCollection, paymentLogics}){
    return {

        createMember:async function (memberObj) {
            // let email = memberObj.email.trim()
            // let password = memberObj.password.trim()
            // let MemberName = email.split("@")[0]

                    return memberCollection.createMember(memberObj)
         
        },

        getmemberById: function (memberId){
            return memberCollection.getmemberById(memberId)
        },

        getMemberByEmail: function (email){
            return memberCollection.getMemberByEmail(email)
        },

        getAllmembers: async function () {
            return new Promise(async (resolve, reject) => {
                let allMemebers = await memberCollection.getAllmembers()
                for(let i=0; i<allMemebers.length; i++){
                    let paymentDetails = await paymentLogics.getPaymentByMemberId(allMemebers[i]._id.valueOf())
                    allMemebers[i].paymentDetails = paymentDetails
                }
                resolve(allMemebers)
            })

        },
        updateMemberData: function(memberId,updateData){
            return memberCollection.updateMemberData(memberId,updateData)
        },

        changeMemberApproval: function (memberId, memberApprovalStatus, declinedMessage) {
            if (memberApprovalStatus == 'DECLINED' || memberApprovalStatus == 'REMOVED') {
                return memberCollection.changeMemberApproval(memberId, memberApprovalStatus, declinedMessage)
            }
            else {
                return memberCollection.changeMemberApproval(memberId, memberApprovalStatus, '')
            }
        },

        

    }
}