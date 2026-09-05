import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatHeader from "./components/ChatHeader/ChatHeader";
import MessageList from "./components/MessageList/MessageList";
import ChatInput from "./components/ChatInput/ChatInput";
import Login from "./components/login/login";
import "./App.css";

const API_BASE_URL = "/api";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("authUser"));
  } catch {
    return null;
  }
};

const authConfig = () => ({
  headers: { "X-User-Id": String(getStoredUser()?.id || "") },
});

function App() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(getStoredUser);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchConversations = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/chat/conversations`,
        authConfig(),
      );
      if (response.data.success) {
        setConversations(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  useEffect(() => {
    if (!user) return;

    const loadConversations = async () => {
      await fetchConversations();
    };

    loadConversations();
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [conversations, isLoading]);

  if (!user) return <Login onAuthenticated={setUser} />;

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setConversations([]);
    setUser(null);
  };

  const handleSendMessage = async (question) => {
    // Optimistically add user message
    const tempUserMessage = {
      id: Date.now(),
      role: "user",
      content: question,
    };
    setConversations((prev) => [...prev, tempUserMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/chat/conversations`,
        { question },
        authConfig(),
      );
      if (response.data.success) {
        const { userConversation, assistantConversation } = response.data.data;
        // Replace temp message with real ones
        setConversations((prev) => {
          const filtered = prev.filter((msg) => msg.id !== tempUserMessage.id);
          return [...filtered, userConversation, assistantConversation];
        });
      }
    } catch (error) {
      console.error("Error posting conversation:", error);

      // Extract error message from backend response or use a realistic fallback
      const errorMessage =
        error.response?.data?.message ||
        "There was an error generating a response.";

      // Add error message to chat
      const errorConversation = {
        id: Date.now() + 1,
        role: "assistant",
        content: errorMessage,
      };

      setConversations((prev) => [...prev, errorConversation]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConversation = async (conversationId) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/chat/conversations/${conversationId}`,
        authConfig(),
      );
      setConversations((prev) =>
        prev.filter((conversation) => conversation.id !== conversationId),
      );
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  return (
    <div className="app">
      <Sidebar />

      <main className="chat">
        <ChatHeader user={user} onLogout={handleLogout} />

        <MessageList
          conversations={conversations}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
          onDeleteConversation={handleDeleteConversation}
        />

        <ChatInput
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default App;
