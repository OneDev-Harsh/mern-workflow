import express from 'express';
import { protect, adminOnly, projectLeaderOnly } from '../middlewares/authMiddleware.js';
import { addComment, createTask, deleteTask, getDashboardData, getTaskActivity, getTaskById, getTasks, getUserDashboardData, updateTask, updateTaskChecklist, updateTaskStatus } from '../controllers/taskController.js';
import Task from '../models/Task.js';

const router = express.Router();

// Task Management routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); //Get all tasks (admin : All tasks, user: assigned tasks)
router.get("/:id", protect, getTaskById); //Get task by ID
router.post("/", protect, createTask); //Create new task (admin only)
router.put("/:id", protect, updateTask); //Update task (admin only)
router.delete("/:id", protect, deleteTask); //Delete task (admin & project-leader only)
router.put("/:id/status", protect, updateTaskStatus); //Update task status
router.put("/:id/todo", protect, updateTaskChecklist); //Update task checklist

router.post("/:id/comment", protect, addComment);

router.get("/:id/activity", getTaskActivity);

router.get("/user/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.userId });
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});


export default router;