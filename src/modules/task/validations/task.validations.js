
import Joi from "joi";

export const addTaskSchema = Joi.object({
    body: Joi.object({
        visibility: Joi.string().valid('Public', 'Private').required(),
        type: Joi.string().valid('Text', 'List').required(),
        text: Joi.string().when('type', { is: 'Text', then: Joi.required() }),
        listItems: Joi.array().items(Joi.object({
            text: Joi.string().when('type', { is: 'List', then: Joi.required() })
        })),
        category: Joi.string().required(),
        user: Joi.string()
    }),
    params: Joi.object({}),
    query: Joi.object({}),
});

export const updateTaskSchema = Joi.object({
    body: Joi.object({
        visibility: Joi.string().valid('Public', 'Private'),
        type: Joi.string().valid('Text', 'List'),
        category: Joi.string(),
        text: Joi.string().when('type', { is: 'Text', then: Joi.required() }),
        listItems: Joi.array().items(Joi.object({
            text: Joi.string().when('type', { is: 'List', then: Joi.required() })
        })),
    }),
    params: Joi.object({
        id: Joi.string().required()
    }),
    query: Joi.object({}),
});

export const deleteTaskSchema = Joi.object({
    body: Joi.object({}),
    params: Joi.object({
        id: Joi.string().required()
    }),
    query: Joi.object({}),
});
