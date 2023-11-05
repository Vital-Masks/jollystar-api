module.exports = function ({ express, memberLogics, paymentLogics, commons }) {

    this.expressRouter = new express.Router({ mergeParams: true })

    this.expressRouter.post('/', createMember);
    this.expressRouter.get('/getAllmembers', getAllmembers);
    this.expressRouter.get('/getEmail', getmemberByEmail);
    this.expressRouter.get('/:memberId', getmemberById);
    

    return this.expressRouter

    function createMember(req, res, next) {
        const { body } = req;
        let paymentDetails = body.paymentDetails;

        delete body.paymentDetails

        return memberLogics.createMember(body).then((result) => {
            console.log("rrr", result)
            paymentDetails.memberId = result._id

            return paymentLogics.createPayment(paymentDetails).then((respos) => {
                res.send({ "status": "member  Saved Successfully", "result": result });
            }).catch((err => {
                return next(commons.errorHandler(err));
            }))

        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    function getmemberByEmail(req, res, next) {  
        const {query:{ email }} = req
        console.log("email",email)
        memberLogics.getMemberByEmail(email).then(result => {
            res.send({ "result": result })
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    function getmemberById(req, res, next) {
        const { params: { memberId } } = req
        memberLogics.getmemberById(memberId).then(result => {
            res.send({ "result": result })
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }

    function getAllmembers(req, res, next) {
        memberLogics.getAllmembers().then(result => {
            res.send({ "result": result })
        }).catch((err => {
            return next(commons.errorHandler(err));
        }))
    }
}