const rejectInvalid = (res, message) => {
  return res.status(400).json({
    success: false,
    message,
  });
};

export const validateCreateConversation = (req, res, next) => {
  const { question } = req.body || {};

  if (!question?.trim()) {
    return rejectInvalid(res, "Question is required.");
  }

  req.body = {
    question: question.trim(),
  };

  return next();
};

export const validateConversationId = (req, res, next) => {
  const { id } = req.params || {};

  if (!id || Number.isNaN(Number(id))) {
    return rejectInvalid(res, "Valid conversation id is required.");
  }

  req.params.id = String(id);
  return next();
};
