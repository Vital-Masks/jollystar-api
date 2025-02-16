
  const mongoose = require('mongoose')
  const memberSchema = new mongoose.Schema(
    {
      membershipCategory: { type: String, required: false },
      profilePicture: { type: Object, required: false },
      title: { type: String, required: false },
      firstName: { type: String, required: false },
      lastName: { type: String, required: false },
      dateOfBirth: { type: String, required: false },
      passportNumber: { type: String, required: false },
      email: { type: String, required: false },
      userName: { type: String, required: false },
      password: { type: String, required: false },
      phoneNumber: { type: String, required: false },
      telephoneNumber: { type: String, required: false },
      address: { type: String, required: false },
      maritalStatus: { type: String, required: false },
      workPlaceName: { type: String, required: false },
      occupation: { type: String, required: false },
      officeAddress: { type: String, required: false },
      schoolDetails: [
        {
          schoolName: { type: String, required: false },
          participated: { type: String, required: false },
          game: { type: String, required: false },
          from: { type: String, required: false },
          to: { type: String, required: false },
          role: { type: String, required: false },
        },
      ],
      clubDetails: [
        {
          clubName: { type: String, required: false },
          involved: { type: String, required: false },
          game: { type: String, required: false },
          from: { type: String, required: false },
          to: { type: String, required: false },
          role: { type: String, required: false },
        },
      ],
      gallery: [{ type: Object, required: false }],
      isSchoolDetailVerified: { type: Boolean, required: false },
      isPaymentDetailVerified: { type: Boolean, required: false },
      memberApprovalStatus: { type: String, required: false },
      membershipId: { type: String, required: false },
      declinedMessage: { type: String, required: false },
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );

  memberSchema.plugin(require("mongoose-autopopulate"));

  const memberModel = mongoose.model("members", memberSchema);

  var memberCollection = {
    createMember: function (doc) {
      const newmemberReqObj = new memberModel(doc);
      return newmemberReqObj
        .save()
        .then((result) => {
          return result;
        })
        .catch((error) => {
          let err = new Error(error);
          err.code = "M" + error.code;
          throw err;
        });
    },

    getmemberById: function (memberId) {
      return memberModel
        .findById(memberId).lean()
        .then((result) => {
          return result;
        })
        .catch((error) => {
          let err = new Error(error);
          throw err;
        });
    },
    getmemberPaymentById: function (memberId) {
        return memberModel
          .findById(memberId)
          .lean()
          .then((result) => {
            return [result];
          })
          .catch((error) => {
            let err = new Error(error);
            throw err;
          });
      },

    getAllmembers: function () {
      return memberModel
        .find().sort({ created_at: -1 })
        .lean()
        .then((result) => {
          return result;
        })
        .catch((error) => {
          let err = new Error(error);
          throw err;
        });
    },

    getMemberByEmail: function (email) {
      return memberModel
        .find({ email: email }).sort({ created_at: -1 })
        .then((result) => {
          return result;
        })
        .catch((error) => {
          let err = new Error(error);
          throw err;
        });
    },

    getMemberByMembershipId: function (membershipId) {
      return memberModel
        .find({ membershipId: membershipId }).sort({ created_at: -1 })
        .then((result) => {
          return result;
        })
        .catch((error) => {
          let err = new Error(error);
          throw err;
        });
    },
    findUser: function (email, password) {
      try {
        // Assuming your memberModel has a 'email' and 'password' field
        const user = memberModel.findOne({ email, password });
        if (user) {

          return user;
        } else {
          // User not found
          let err = new Error(error);
          throw err;
        }
      } catch (error) {
        console.error("Error finding user:", error);

        throw error;
      }
    },

    updateMemberData: function (memberId, updateData) {
      return memberModel
        .findOneAndUpdate({ _id: memberId }, updateData, {
          returnDocument: "after",
        })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          let err = new Error(error);
          throw err;
        });
    },

    changeMemberApproval: function (
      memberId,
      memberApprovalStatus,
      declinedMessage
    ) {
      return memberModel
        .findOneAndUpdate(
          { _id: memberId },
          {
            memberApprovalStatus: memberApprovalStatus,
            declinedMessage: declinedMessage,
          },
          { returnDocument: "after" }
        )
        .then((response) => {
          return response;
        })
        .catch((error) => {
          let err = new Error(error);
          throw err;
        });
    },
  };
module.exports = memberCollection
