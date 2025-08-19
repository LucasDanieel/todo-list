import { Dispatch, SetStateAction, useState } from "react";
import styles from "./modal-add-todo.module.css";

type ModalAddTodoProps = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  addNewTodo: (value: string) => void;
};

export default function ModalAddTodo({ setOpenModal, addNewTodo }: ModalAddTodoProps) {
  const [todoName, setTodoName] = useState<string>("");

  return (
    <div className={styles.modalAddTodo}>
      <div className={styles.addTodo}>
        <h3>Adicionar tarefa</h3>
        <input
          type="text"
          placeholder="Digite o nome da tarefa"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <div className={styles.modalButtons}>
          <button className={styles.cancel} onClick={() => setOpenModal(false)}>
            Cancelar
          </button>
          <button className={styles.add} onClick={() => addNewTodo(todoName)}>Adicionar</button>
        </div>
      </div>
    </div>
  );
}
