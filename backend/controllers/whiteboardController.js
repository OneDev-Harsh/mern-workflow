import axios from "axios";
import Task from "../models/Task.js";

export const saveWhiteboard = async (req, res) => {
  try {
    const { boardId } = req.params;

    const { data } = await axios.get(
      `https://wbo.ophir.dev/boards/${boardId}?export`
    );

    await Task.findOneAndUpdate(
      { boardId },
      { boardState: data }
    );

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot save board" });
  }
};
