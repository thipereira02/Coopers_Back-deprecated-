import { taskSchema } from "../schemas/TaskSchema";

import * as tasksRepository from "../repositories/tasksRepository";

export async function addTask(description: string, taskType: string, token: string) {
    const isValid = taskSchema.validate({ description, taskType });
    if (isValid.error !== undefined) return false;

    const getUserId = await tasksRepository.getUserId(token);

    await tasksRepository.addTask(description, taskType, getUserId.userId);
    return "Task added successfully";
}