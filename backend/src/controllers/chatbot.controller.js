import * as chatbotService from "../services/chatbot.service.js";

export const chatWithChatbot = async (req, res) => {
  const result = await chatbotService.chatWithChatbot(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};
