"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Todo from "./components/todo/todo";
import ModalAddTodo from "./components/modal-add-todo/modal-add-todo";
import Title from "./components/title/title";

export type TodoItemProps = {
  id: number;
  name: string;
  done: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<TodoItemProps[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const last_id = useRef<number>(0);

  useEffect(() => {
    const todoItens = localStorage.getItem("todo");
    if (todoItens == null || todoItens == "[]") return;

    const todoList = JSON.parse(todoItens) as TodoItemProps[];
    setTodos(todoList);

    var last = todoList[todoList.length - 1];
    last_id.current = last.id;
  }, []);

  const addNewTodo = (value: string) => {
    if (value.trim().length == 0 || value == "") return setOpenModal(false);

    last_id.current = last_id.current + 1;
    setTodos((s) => {
      const todoItens = [...s, { id: last_id.current, name: value, done: false }];
      localStorage.setItem("todo", JSON.stringify(todoItens));
      return todoItens;
    });

    setOpenModal(false);
  };

  const updateTodo = (todo: TodoItemProps, value: boolean) => {
    setTodos((s) => {
      const newList = s.map((todoIten) => {
        if (todoIten.id == todo.id) todoIten.done = value;
        return todoIten;
      });

      localStorage.setItem("todo", JSON.stringify(newList));
      return newList;
    });
  };

  const removeTodo = (todo: TodoItemProps) => {
    const list = localStorage.getItem("todo");
    if (list == null) return;

    const todoItens = JSON.parse(list) as TodoItemProps[];
    const newTodoList = todoItens.filter((todoIten, idx) => todoIten.id !== todo.id);
    localStorage.setItem("todo", JSON.stringify(newTodoList));
    setTodos(newTodoList);
  };

  return (
    <main className={styles.page}>
      <Title setOpenModal={setOpenModal} />
      <div className={styles.list}>
        {todos.map((todo, idx) => (
          <Todo todo={todo} updateTodo={updateTodo} removeTodo={removeTodo} key={idx} />
        ))}
        {openModal && <ModalAddTodo setOpenModal={setOpenModal} addNewTodo={addNewTodo} />}
      </div>
    </main>
  );
}
