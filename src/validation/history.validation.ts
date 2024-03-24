import * as Joi from 'joi'

const history_joi = Joi.object({
    type: Joi.string().required(),
    value: Joi.number().required(),
    moneys_id: Joi.number().required()
}).unknown(true);


export {
    history_joi
}