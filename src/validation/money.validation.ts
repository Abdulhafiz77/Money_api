import * as Joi from 'joi'

const money_joi = Joi.object({
    type_of: Joi.string().required(),
    value: Joi.number().required(),
    users_id: Joi.number().required()
}).unknown(true);


export {
    money_joi
}