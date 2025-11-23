// components
import Title from "./ui/Title";
import { MessageCircleIcon, SendIcon, PlusIcon, Loader2, TrashIcon } from "lucide-react";
import Button from "./ui/Button";

// hooks
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import useChatbotStore from "../hooks/useChatbotStore";
import apiRequest from "../utils/apiRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  // states
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isResponding, setIsResponding] = useState(false);

  const { messages, addMessage, clearMessages } = useChatbotStore();
  const { register, handleSubmit, reset } = useForm();
  const messageContainerRef = useRef(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    addMessage({ role: "user", content: data.message });
    reset();

    try {
      setIsResponding(true);
      const res = await apiRequest.post("/chatbot", { message: data.message, historyMessages: messages });
      if (res.data.status) {
        addMessage({ role: "bot", content: res.data.data });
      } else {
        toast.error("Lỗi khi gửi tin nhắn");
      }
    } catch (error) {
      toast.error("Lỗi khi gửi tin nhắn");
    } finally {
      setIsResponding(false);
    }
  };

  useEffect(() => {
    if (!isChatbotOpen) return; // chỉ chạy khi chatbot mở
    const container = messageContainerRef.current;
    if (!container) return;

    const handleClick = (e) => {
      if (e.target.tagName.toLowerCase() === "img") {
        const pathName = e.target.getAttribute("pathname");
        navigate(pathName);
      }
    };

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [isChatbotOpen, messageContainerRef]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    const container = messageContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isResponding, isChatbotOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-primary rounded-full p-4 flex items-center justify-center">
      <button onClick={() => setIsChatbotOpen(!isChatbotOpen)} className=" cursor-pointer select-none">
        <MessageCircleIcon className="w-6 h-6 text-white" />
      </button>

      {isChatbotOpen && (
        <div className="absolute bottom-14 right-0 w-140 h-140 bg-white rounded-3xl animate-slide-up shadow-lg border border-primary p-4 flex flex-col">
          {/* Header */}
          <div className="border-b border-gray-200 pb-2 flex items-center gap-2">
            <img
              src="https://i.pinimg.com/1200x/a7/9c/8e/a79c8ec95bdbdbbd4bf4d26826d78f95.jpg"
              alt=""
              className="w-10 h-10 object-cover rounded-full "
            />

            <div className="flex flex-col">
              <p className="text-sm font-semibold text-primary">Huỳnh Phương Nhi</p>
              <p className="text-xs text-gray-600">Online</p>
            </div>

            <div className="ml-auto">
              <Button variant="outline" size="small" onClick={clearMessages}>
                <TrashIcon className="w-4 h-4" />
                Xóa nỗi nhớ về em
              </Button>
            </div>
          </div>

          <div ref={messageContainerRef} className="flex-1 max-h-[500px] overflow-y-auto hide-scrollbar py-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 p-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex flex-col ${
                    message.role === "user"
                      ? "bg-primary text-white rounded-xl px-3 py-3 max-w-[95%] text-sm"
                      : "bg-gray-100 rounded-xl px-3 py-3 max-w-[95%]"
                  }`}
                  dangerouslySetInnerHTML={{ __html: message.content }}
                ></div>
              </div>
            ))}

            {isResponding && (
              <div className="flex items-center justify-start">
                <p className="text-sm text-gray-600">Đang phản hồi...</p>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center gap-2 mt-2">
            <input
              {...register("message")}
              type="text"
              className="w-full px-3 py-2 border border-gray-500 rounded-xl focus:outline-none text-sm"
            />
            <Button
              variant="primary"
              size="medium"
              icon={isResponding ? <Loader2 className="w-4 h-4 animate-spin" /> : <SendIcon className="w-4 h-4" />}
              type="submit"
              disabled={isResponding}
            >
              {isResponding ? <span className="flex items-center gap-2">Đang gửi</span> : "Gửi tin nhắn"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
