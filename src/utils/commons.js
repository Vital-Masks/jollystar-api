
    var commons = {
        errorHandler(originalError){
            const error = new Error();
            // error.code = typeof err === "string" ? err  : err.code;

            if(originalError) error.stack = originalError;

            return error
        }


    }
module.exports = commons