const httpStatus = require("http-status");
const Joi = require("joi");
const { head } = require("lodash")

const requestValidator = (schema, property = "body") => async(req, res, next) => {
    data = req[property]
    try {
        req.item = await Joi.validate(data, schema, {
            stripUnknown: { objects: true, arrays: true },
            convert: true,
            abortEarly: false
        });
    } catch (err) {
        if (err.details) {
            err.message = head(err.details).message;
        } else {
            console.log('Schema error');
        }
        res.status(httpStatus.BAD_REQUEST).send({ success: false, error: httpStatus.BAD_REQUEST + " " + err.name, errorMsg: err.message })
        return next([err.message]);
    }

    return next();
}

module.exports = { requestValidator };