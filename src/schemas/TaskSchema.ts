import joi from "joi";

const taskSchema = joi.object({
    description: joi.string().trim().min(3).required(),
    taskType: joi.string().required(),
});

export { taskSchema };