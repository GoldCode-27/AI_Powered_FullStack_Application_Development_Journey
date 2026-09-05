import { MoreHorizontal, Trash2, User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from "./ChatMessage.module.css";

export default function ChatMessage({ id, role, content, onDelete }) {
  return (
    <div className={`${styles.message} ${styles[role]}`}>
      <div className={`${styles.avatar} ${styles[role]}`}>
        {role === "user" ? (
          <User sib ze={18} color="white" />
        ) : (
          <Bot size={18} color="white" />
        )}
      </div>
      <div className={styles.messageBody}>
        <div className={styles.content}>
          {role === "user" ? (
            content
          ) : (
            <div className={styles.markdownBody}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.moreButton}
            aria-label="Conversation actions"
            title="Conversation actions"
          >
            <MoreHorizontal size={18} />
          </button>
          <div className={styles.menu}>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => onDelete(id)}
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
