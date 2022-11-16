import { Response, Request } from "express";

import { UserInterface } from "../interfaces/userInterface";
import * as usersService from "../services/usersService";

export async function newUser(req: Request, res: Response) {
    try{
        const { username, email, password, confirmPassword } = req.body as UserInterface;

        const createUser = await usersService.newUser(username, email, password, confirmPassword);
        if (createUser === false) return res.sendStatus(400);
        if (createUser === null) return res.sendStatus(409);
        
        return res.status(201).send(createUser);

    } catch (err) {
        console.log('de novo')
        console.log(err);
        res.sendStatus(500);
    }
}