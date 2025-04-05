"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  const handleClick = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

    const getData = async () => {
    try {
      const res = await axios.get("/api/todos");
      const todosWithCompletion = res.data.map((todo: any) => ({
        ...todo,
        isCompleted: false,
      }));
      console.log(res.data);
      
      setTodos(todosWithCompletion);
    } catch (error: any) {
      console.log("Error fetching data: ", error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this todo?"
      );
      if (confirmDelete) {
        await axios.delete(`/api/todos?id=${id}`);
        getData();
      }
    } catch (error: any) {
      console.log("delete error: ", error.message);
    }
  };
  return (
    <>
      {todos.map((todo, index) => {
        const { _id, title, description, isCompleted } = todo;
        return (
          <tr key={_id} className="border-t font-bold">
            <td className="px-4 py-2 text-red-500">{index + 1}.</td>
            <td className="px-4 py-2">{title}</td>
            <td className="px-4 py-2">{description}</td>
            <td
              className={`px-4 py-2 ${
                isCompleted ? "text-green-500" : "text-blue-500"
              }`}
            >
              {isCompleted ? "Completed" : "Pending..."}
            </td>
            <td className="px-4 py-2">
              <button
                onClick={() => handleDelete(_id)}
                className="active:bg-red-700 px-2 py-1 bg-red-500 rounded-md"
              >
                Delete
              </button>{" "}
              <button
                onClick={() => handleClick(_id)}
                className={`px-2 py-1 active:bg-red-700 ${
                  isCompleted ? "bg-green-500 transition-all" : "bg-purple-500"
                } rounded-md`}
              >
                {isCompleted ? "Completed" : "Complete"}
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default Todo;
