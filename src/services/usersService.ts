import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import * as usersRepository from "../repositories/usersRepository";
import { signUpSchema, loginSchema } from "../schemas/UserSchema";

export async function newUser(username: string, email: string, password: string, confirmPassword: string) {
    const isValid = signUpSchema.validate({ username, email, password, confirmPassword });
    if (isValid.error !== undefined) {
        let message = "";
        switch (isValid.error.details[0].type) {
            case "string.min":
                message = "User deve ter pelo menos 3 caracteres";
                break;
            case "string.email":
                message = "Formato de email inválido";
                break;
            case "string.pattern.base":
                message = "A senha deve ter pelo menos 8 caracteres, sendo uma letra maiúscula, uma letra minúscula, um número e um caractere especial";
                break;
            case "any.only":
                message = "Senhas não coincidem";
                break;
            default:
                message = "Dados inválidos";
                break;
        } 
        return {message};
    }

    const userIsAvailable = await usersRepository.userIsAvailable(username);
    if (userIsAvailable === false) return null;

    const emailIsAvailable = await usersRepository.emailIsAvailable(email);
    if (emailIsAvailable === false) return null;

    const token = faker.datatype.uuid();
    const hash = bcrypt.hashSync(password, 12);

    const userToken = await usersRepository.newUser(username, email, token, hash);
    return userToken;
}

export async function login(username: string, password: string) {

    const isValid = loginSchema.validate({ username, password });
    if (isValid.error !== undefined) return "invalid";

    const userExists = await usersRepository.userExists(username);
    if (userExists === false) return false;

    const isPasswordCorrect = bcrypt.compareSync(password, userExists.password);
    if (isPasswordCorrect === false) return false;
    const token = faker.datatype.uuid();

    const newSession = await usersRepository.newSession(userExists.id, token);
    return newSession;
}

export async function logout(token: string) {
    const finishSession = await usersRepository.finishSession(token);
    return finishSession;
}