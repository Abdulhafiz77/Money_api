import * as Joi from 'joi'

const income_joi = Joi.object({
    save: Joi.number().required(),
    moneys_id: Joi.number().required()
}).unknown(true);


export {
    income_joi
}