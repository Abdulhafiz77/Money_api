import * as Joi from 'joi'

const expense_joi = Joi.object({
    spend: Joi.number().required(),
    moneys_id: Joi.number().required()
}).unknown(true);


export {
    expense_joi
}