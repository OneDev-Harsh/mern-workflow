import express from "express";
import { saveWhiteboard } from "../controllers/whiteboardController.js";

const router = express.Router();

router.get("/save/:boardId", saveWhiteboard);

export default router;
