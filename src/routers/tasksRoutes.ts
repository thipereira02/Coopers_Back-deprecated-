import express from "express";

import * as tasksController from "../controllers/tasksController";

const router = express.Router();

router.post("/tasks", tasksController.addTask);
router.get("/tasks", tasksController.getTasks);

export default router;