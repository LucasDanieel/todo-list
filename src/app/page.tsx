"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Todo from "./components/todo/todo";
import ModalAddTodo from "./components/modal-add-todo/modal-add-todo";
import Title from "./components/title/title";

export type TodoItemProps = {
  name: string;
  done: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<TodoItemProps[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const todoItens = localStorage.getItem("todo");
    if (todoItens == null) return;

    const todoList = JSON.parse(todoItens) as TodoItemProps[];
    setTodos(todoList);
  }, []);

  const addNewTodo = (value: string) => {
    setTodos((s) => {
      const todoItens = [...s, { name: value, done: false }];
      localStorage.setItem("todo", JSON.stringify(todoItens));
      return todoItens;
    });
    setOpenModal(false);
  };

  const updateTodo = (todo: TodoItemProps, value: boolean) => {
    setTodos((s) => {
      const newList = s.map((todoIten) => {
        if (todoIten.name == todo.name) todoIten.done = value;
        return todoIten;
      });

      localStorage.setItem("todo", JSON.stringify(newList));
      return newList;
    });
  };

  const removeTodo = (value: string) => {
    const list = localStorage.getItem("todo");
    if (list == null) return;

    const todoItens = JSON.parse(list) as TodoItemProps[];
    const newTodoList = todoItens.filter((todoIten, idx) => todoIten.name !== value);
    localStorage.setItem("todo", JSON.stringify(newTodoList));
    setTodos(newTodoList);
  };

  return (
    <div>
      <main className={styles.page}>
        <Title setOpenModal={setOpenModal} />
        <div className={styles.list}>
          {todos.map((todo, idx) => (
            <Todo todo={todo} updateTodo={updateTodo} removeTodo={removeTodo} key={idx} />
          ))}
        </div>
      </main>
      {openModal && <ModalAddTodo setOpenModal={setOpenModal} addNewTodo={addNewTodo} />}
    </div>
  );
}
