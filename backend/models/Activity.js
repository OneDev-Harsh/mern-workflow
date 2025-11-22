import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // comment bots, system actions etc.
    },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
