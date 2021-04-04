import Joi from 'joi'

export const addBookSchema = Joi.object({
	isbn: Joi.number().required().min(10),
})

export const imageSchemma = Joi.object({
	file: Joi.object().required(),
})
