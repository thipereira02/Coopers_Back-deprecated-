import { Response, Request } from "express";

import { TaskInterface } from "../interfaces/taskInterface";
import * as tasksService from "../services/tasksService";

export async function addTask(req: Request, res: Response) {
    try{
        const { description, taskType } = req.body as TaskInterface;
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");

        if (!token) return res.sendStatus(401);

        const addTask = await tasksService.addTask(description, taskType, token);
        if (addTask === false) return res.sendStatus(400);
        
        return res.status(201).send(addTask);

    }catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}