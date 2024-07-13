// middlewares/validate.middleware.js
import { AppError } from '../utils/error.handler.js';

export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(
            {
                body: req.body,
                params: req.params,
                query: req.query,
                ...(req.file && { file: req.file }),
                ...(req.files ? { files: req.files } : {}),
            },
            { abortEarly: false }
        );

        if (error) {
            return next(
                new AppError(
                    error.details.map((d) => d.message).join(', '),
                    400
                )
            );
        }
        next();
    };
};
