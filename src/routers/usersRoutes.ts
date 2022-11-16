import express from "express";

import * as usersController from "../controllers/usersController";

const router = express.Router();

router.post("/signup", usersController.newUser);
router.post("/login", usersController.login);

export default router;