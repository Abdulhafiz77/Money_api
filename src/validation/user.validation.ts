
import * as Joi from 'joi'

const user_add_joi = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    middle_name: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    status: Joi.number()
}).unknown(true);

const user_query_joi = Joi.object({
    search: Joi.string().allow(null),
    limit: Joi.number().min(5).allow(null),
    status: Joi.number().min(0).max(10).allow(null),
    page: Joi.number().min(1).allow(null),
}).unknown(true);

export {
    user_query_joi,
    user_add_joi
}