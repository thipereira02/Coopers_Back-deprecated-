import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import * as usersRepository from "../repositories/usersRepository";
import { signUpSchema } from "../schemas/UserSchema";

export async function newUser(username: string, email: string, password: string, confirmPassword: string) {
    const isValid = signUpSchema.validate({ username, email, password, confirmPassword });
    if (isValid.error !== undefined) return false;

    const userIsAvailable = await usersRepository.userIsAvailable(username);
    if (userIsAvailable === false) return null;

    const emailIsAvailable = await usersRepository.emailIsAvailable(email);
    if (emailIsAvailable === false) return null;

    const token = faker.datatype.uuid();
    const hash = bcrypt.hashSync(password, 12);

    const userToken = await usersRepository.newUser(username, email, token, hash);
    return userToken;
}