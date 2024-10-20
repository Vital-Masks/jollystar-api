
  const paymentLogics = require('../business-logics/payment-logics')
  const memberLogics = require('../business-logics/member-logics')
  const commons =  require('../utils/commons')
  const express = require('express');

  expressRouter =express.Router();

  expressRouter.post("/", createMember);
  expressRouter.post("/login", loginMember);
  expressRouter.get("/getAllmembers", getAllmembers);
  expressRouter.get("/getMemberStatusMembers/:memberApprovalStatus",getMemberStatusMembers);
  expressRouter.get("/getEmail", getmemberByEmail);
  expressRouter.get("/memberPayment/:memberId", getmemberPaymentById);
  expressRouter.get("/:memberId", getmemberById);
  expressRouter.put("/:memberId", updateMemberData);
  expressRouter.put("/memberApproval/:memberId", changeMemberApproval);
  const mongoose = require("mongoose");


  function createMember(req, res, next) {
    const { body } = req;
    let paymentDetails = body.paymentDetails;

    delete body.paymentDetails;

    return memberLogics
      .createMember(body)
      .then((result) => {
        console.log("rrr", result);
        paymentDetails.memberId = result._id;

        return paymentLogics
          .createPayment(paymentDetails)
          .then((respos) => {
            res.send({ status: "member  Saved Successfully", result: result });
          })
          .catch((err) => {
            return next(commons.errorHandler(err));
          });
      })
      .catch((err) => {
        return next(commons.errorHandler(err));
      });
  }
  function loginMember(req, res, next) {
    const { body } = req;
    let email = body.email;
    let password = body.password;
    delete body.paymentDetails;
    return memberLogics
      .loginMember(email, password)
      .then((result) => {
        res.send({ result: result });
      })
      .catch((err) => {
        return next(commons.errorHandler(err));
      });
  }

  function getmemberByEmail(req, res, next) {
    const {
      query: { email },
    } = req;
    console.log("email", email);
    memberLogics
      .getMemberByEmail(email)
      .then((result) => {
        res.send({ result: result });
      })
      .catch((err) => {
        return next(commons.errorHandler(err));
      });
  }

  function getmemberById(req, res, next) {
    const {
      params: { memberId },
    } = req;

    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      return res.status(400).send({ error: "Invalid memberId" });
    }

    memberLogics
      .getmemberById(memberId)
      .then((result) => {
        res.send({ result: result });
      })
      .catch((err) => {
        return next(commons.errorHandler(err));
      });
  }
  function getmemberPaymentById(req, res, next) {
    const {
      params: { memberId },
    } = req;

    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      return res.status(400).send({ error: "Invalid memberId" });
    }

    memberLogics
      .getmemberPaymentById(memberId)
      .then((result) => {
        res.send({ result: result });
      })
      .catch((err) => {
        return next(commons.errorHandler(err));
      });
  }

  function getAllmembers(req, res, next) {
    memberLogics
      .getAllmembers()
      .then((result) => {
        res.send({ result: result });
      })
      .catch((err) => {
        return next(commons.errorHandler(err));
      });
  }
  function getMemberStatusMembers(req, res, next) {
    const {
      params: { memberApprovalStatus },
    } = req;
    let memberApprovalStatusCAP = memberApprovalStatus.toUpperCase();
    // const { body: { memberApprovalStatus } } = req
    // console.log(memberApprovalStatus,"meber-controller- line 73");
    memberLogics
      .getMemberStatusMembers(memberApprovalStatusCAP)
      .then((result) => {
        res.send({ result: result });
      })
      .catch((err) => {
        return next(commons.errorHandler(err));
      });
  }

  function updateMemberData(req, res, next) {
    const {
      params: { memberId },
    } = req;
    const { body } = req;
    memberLogics
      .updateMemberData(memberId, body)
      .then((result) => {
        res.send({ result: result });
      })
      .catch((err) => {
        return next(commons.errorHandler(err));
      });
  }

  function changeMemberApproval(req, res, next) {
    const {
      params: { memberId },
    } = req;
    const {
      body: { memberApprovalStatus, declinedMessage },
    } = req;

    if (
      memberApprovalStatus !== "DECLINED" &&
      memberApprovalStatus !== "APPROVED" &&
      memberApprovalStatus !== "PENDING" &&
      memberApprovalStatus !== "REMOVED"
    ) {
      res.status(400).send({
        result:
          "Member Approval Status in wrong. It should be APPROVED or PENDING or DECLINED or REMOVED",
      });
    } else if (
      (memberApprovalStatus == "DECLINED" ||
        memberApprovalStatus == "REMOVED") &&
      (!declinedMessage || declinedMessage == "")
    ) {
      res.status(400).send({
        result: "Declined memberships should be have a declined message",
      });
    } else if (
      (memberApprovalStatus == "DECLINED" ||
        memberApprovalStatus == "REMOVED") &&
      declinedMessage &&
      declinedMessage != ""
    ) {
      memberLogics
        .changeMemberApproval(memberId, memberApprovalStatus, declinedMessage)
        .then((result) => {
          res.send({ result: result });
        })
        .catch((err) => {
          return next(commons.errorHandler(err));
        });
    } else {
      memberLogics
        .changeMemberApproval(memberId, memberApprovalStatus)
        .then((result) => {
          res.send({ result: result });
        })
        .catch((err) => {
          return next(commons.errorHandler(err));
        });
    }
  }
  module.exports = expressRouter
