import Joi from 'joi';

// סכמות אימות
const urlSchema = Joi.object({
    url: Joi.string().uri().required(),
});

const storySchema = Joi.object({
    story: Joi.string().min(10).required(),
});

// Middleware לאימות URL
export const validateUrl = (req, res, next) => {
    const { error } = urlSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};


const emailContentSchema = Joi.object({
    emailContent: Joi.string().min(20).required(),
});

export const validateEmailContent = (req, res, next) => {
    const { error } = emailContentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
