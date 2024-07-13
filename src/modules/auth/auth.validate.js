import Joi from "joi";

export const signupSchema = Joi.object({
	body: {
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ['com', 'net'] },
			})
			.required(),
		password: Joi.string()
			.required(),
		name: Joi.string().required(),
		role:Joi.string(),
	},
	params: {},
	query: {},
})


export const signinSchema=Joi.object({
	body:{
		email: Joi.string().required(),
		password: Joi.string().required(),
	},
	params: {},
	query: {},
})