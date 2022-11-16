import express from "express";

import * as usersController from "../controllers/usersController";

const router = express.Router();

router.post("/signup", usersController.newUser);

export default router;