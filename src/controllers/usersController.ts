import { Response, Request } from "express";

import { SignUpInterface, LoginInterface } from "../interfaces/userInterface";
import * as usersService from "../services/usersService";

export async function signup(req: Request, res: Response) {
    try{
        const { username, email, password, confirmPassword } = req.body as SignUpInterface;

        const createUser = await usersService.newUser(username, email, password, confirmPassword);
        if (typeof createUser === "object") return res.status(400).send(createUser);
        if (createUser === null) return res.status(409).send("Usuário ou email já cadastrados");
        
        return res.status(201).send(createUser);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function login(req: Request, res: Response) {
    try{
        const { username, password } = req.body as LoginInterface;

        const login = await usersService.login(username, password);
        if (login === "invalid") return res.sendStatus(400);
        if (login === false) return res.sendStatus(404);

        return res.status(200).send(login);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function logout(req: Request, res: Response) {
    try{
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");
        if (!token) return res.sendStatus(401);

        const logout = await usersService.logout(token);
        if (!logout) return res.sendStatus(503);

        return res.sendStatus(200);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}