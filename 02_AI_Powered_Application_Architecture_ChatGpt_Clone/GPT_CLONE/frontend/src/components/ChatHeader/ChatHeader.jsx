import { ChevronDown } from "lucide-react";
import styles from "./ChatHeader.module.css";

export default function ChatHeader({ user, onLogout }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <span>ChatGPT</span>
        <ChevronDown size={16} />
      </div>
      <div className={styles.right}>
        <span>{user.name}</span>
        <button type="button" onClick={onLogout}>
          Log out
        </button>
      </div>
    </header>
  );
}
