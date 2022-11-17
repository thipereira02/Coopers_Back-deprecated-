import express from "express";

import * as tasksController from "../controllers/tasksController";

const router = express.Router();

router.post("/addTask", tasksController.addTask);

export default router;