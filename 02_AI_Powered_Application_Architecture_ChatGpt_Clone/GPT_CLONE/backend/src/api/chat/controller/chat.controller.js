import {
  createConversationService,
  getRecentConversationsRows,
  deleteConversationService,
} from "../service/chat.service.js";

const getUserId = (req) =>
  Number.parseInt(req.headers["x-user-id"], 10) || null;

export const createConversationController = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = getUserId(req);

    if (!userId)
      return res.status(401).json({
        success: false,
        message: "User ID required",
      });

    const result = await createConversationService(question, userId);
    res.status(201).json({ success: true, message: "Created", data: result });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getConversationsController = async (req, res) => {
  try {
    const userId = getUserId(req);
    const result = await getRecentConversationsRows(100, userId);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteConversationController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteConversationService(id, getUserId(req));
    res.status(200).json({ success: true, message: result.message });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message });
  }
};
