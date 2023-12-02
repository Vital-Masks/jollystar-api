module.exports = function ({ memberCollection, paymentLogics }) {
  return {
    createMember: async function (memberObj) {
      // let email = memberObj.email.trim()
      // let password = memberObj.password.trim()
      // let MemberName = email.split("@")[0]

      return memberCollection.createMember(memberObj);
    },

    getmemberById: function (memberId) {
      return memberCollection.getmemberById(memberId);
    },

    getMemberByEmail: function (email) {
      return memberCollection.getMemberByEmail(email);
    },

    getAllmembers: async function () {
      return new Promise(async (resolve, reject) => {
        let allMemebers = await memberCollection.getAllmembers();
        for (let i = 0; i < allMemebers.length; i++) {
          let paymentDetails = await paymentLogics.getPaymentByMemberId(
            allMemebers[i]._id.valueOf()
          );
          allMemebers[i].paymentDetails = paymentDetails;
        }
        resolve(allMemebers);
      });
    },
    getMemberStatusMembers: async function (memberApprovalStatus) {
      console.log(memberApprovalStatus);
      return new Promise(async (resolve, reject) => {
        let allMembers = await memberCollection.getAllmembers();
        // let sanitizedMembers = allMembers.map(({ profilePicture, paymentDetails, password, ...rest }) => rest);

        // Filter members based on memberApprovalStatus
        let approvedMembers = allMembers.filter(
          (member) => member.memberApprovalStatus === memberApprovalStatus
        );

        let processedMembers = approvedMembers.map(async (member) => {
            // Fetch payment details
            // Return a subset of member data along with payment details
            return {
                _id:member._id,
              firstName: member.firstName,
              lastName: member.lastName,
              created_at: member.created_at,
              passportNumber: member.passportNumber,
              phoneNumber: member.phoneNumber,
              email: member.email,
              membershipCategory:member.membershipCategory,
              updated_at:member.updated_at,
              memberApprovalStatus:member.memberApprovalStatus,
              declinedMessage:member.declinedMessage
            };
          });

          processedMembers = await Promise.all(processedMembers);


        resolve(processedMembers);
      });
    },

    updateMemberData: function (memberId, updateData) {
      return memberCollection.updateMemberData(memberId, updateData);
    },

    changeMemberApproval: function (
      memberId,
      memberApprovalStatus,
      declinedMessage
    ) {
      if (
        memberApprovalStatus == "DECLINED" ||
        memberApprovalStatus == "REMOVED"
      ) {
        return memberCollection.changeMemberApproval(
          memberId,
          memberApprovalStatus,
          declinedMessage
        );
      } else {
        return memberCollection.changeMemberApproval(
          memberId,
          memberApprovalStatus,
          ""
        );
      }
    },
  };
};
