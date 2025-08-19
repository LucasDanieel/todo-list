import { Dispatch, SetStateAction } from "react";
import styles from "./title.module.css";

type TitleProps = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function Title({ setOpenModal }: TitleProps) {
  return (
    <div className={styles.title}>
      <h2>Todo List</h2>
      <div className={styles.iconTitle} onClick={() => setOpenModal(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
      </div>
    </div>
  );
}
