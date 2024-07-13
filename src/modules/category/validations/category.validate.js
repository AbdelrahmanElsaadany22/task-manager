import Joi from "joi";
export const addCategorySchema = Joi.object({
    body: Joi.object({
        name:Joi.string().required()
    }),
    params: Joi.object({}),
    query: Joi.object({}),
});
export const updateCategorySchema = Joi.object({
    body: Joi.object({
        name:Joi.string().required()
    }),
    params: Joi.object({id:Joi.string().required()}),
    query: Joi.object({}),
});
export const deleteCategorySchema = Joi.object({
    body: Joi.object({
    }),
    params: Joi.object({id:Joi.string().required()}),
    query: Joi.object({}),
});