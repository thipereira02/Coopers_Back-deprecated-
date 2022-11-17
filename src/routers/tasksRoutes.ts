import express from "express";

import * as tasksController from "../controllers/tasksController";

const router = express.Router();

router.post("/addTask", tasksController.addTask);
router.get("/getTasks", tasksController.getTasks);

export default router;