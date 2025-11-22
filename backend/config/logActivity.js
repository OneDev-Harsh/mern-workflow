import Activity from "../models/Activity.js";

export const logActivity = async (taskId, userId, message) => {
  try {
    await Activity.create({
      task: taskId,
      user: userId,
      message,
    });
  } catch (err) {
    console.error("Activity Log Error:", err);
  }
};
