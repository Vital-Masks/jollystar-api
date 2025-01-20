
  const memberCollection = require('../persistence/member-collection')
  const paymentLogics = require('../business-logics/payment-logics')
  var memberLogics = {
    createMember: async function (memberObj) {
      // let email = memberObj.email.trim()
      // let password = memberObj.password.trim()
      // let MemberName = email.split("@")[0]

      return memberCollection.createMember(memberObj);
    },
    loginMember: async function (email, password) {
      console.log(email, password, "line 11");

      return new Promise(async (resolve, reject) => {
        const user = await memberCollection.findUser(email, password);
        var obj = {};
        if (user) {
          obj = {
            email: user.email,
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
          };
        }

        resolve(obj);
      });
    },

    getmemberById: async function (memberId) {
      let paymentDetails = await paymentLogics.getPaymentByMemberId(memberId);
      let memberDetails = await memberCollection.getmemberById(memberId)
      return {...memberDetails,paymentDetail:paymentDetails}
    },
    getmemberPaymentById: async function (memberId) {
      return new Promise(async (resolve, reject) => {
        try {
          // Retrieve member data
          let allMemebers = await memberCollection.getmemberPaymentById(memberId);
          let paymentDetails = await paymentLogics.getPaymentByMemberId(
            memberId
          );
          allMemebers[0].paymentDetails = paymentDetails;
        
          resolve(allMemebers);
        } catch (error) {
          // Reject if there's an error
          reject(error);
        }
      });
    },

    getMemberByEmail: function (email) {
      return memberCollection.getMemberByEmail(email);
    },

    getMemberByMembershipId: function (membershipId) {
      return memberCollection.getMemberByMembershipId(membershipId);
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
            _id: member._id,
            firstName: member.firstName,
            lastName: member.lastName,
            created_at: member.created_at,
            passportNumber: member.passportNumber,
            phoneNumber: member.phoneNumber,
            email: member.email,
            membershipCategory: member.membershipCategory,
            updated_at: member.updated_at,
            memberApprovalStatus: member.memberApprovalStatus,
            declinedMessage: member.declinedMessage,
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

module.exports = memberLogics