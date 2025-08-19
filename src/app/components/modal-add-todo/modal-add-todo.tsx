import { useEffect, useRef, useState } from "react";
import styles from "./modal-add-todo.module.css";

type ModalAddTodoProps = {
  addNewTodo: (value: string) => void;
};

export default function ModalAddTodo({ addNewTodo }: ModalAddTodoProps) {
  const [todoName, setTodoName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const onKeyPressDown = (value: string) => {
    if (value == "Enter") addNewTodo(todoName);
  };

  return (
    <div className={styles.newTodo}>
      <input
        type="text"
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
        onKeyDown={(e) => onKeyPressDown(e.key)}
        onBlur={() => addNewTodo(todoName)}
        ref={inputRef}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className={styles.newTodoIcon}
        viewBox="0 0 16 16"
        onClick={() => addNewTodo(todoName)}
      >
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
      </svg>
    </div>
  );
}
