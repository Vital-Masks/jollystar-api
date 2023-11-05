module.exports = function({memberCollection, config, aws}){
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

        getAllmembers: function (){
            return memberCollection.getAllmembers()
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