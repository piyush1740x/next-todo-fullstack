"use client";
import Todo from "@/components/Todo";
import React, { useState } from "react";
import axios from "axios";
const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  const handleSubmit = async (e) => {
    setTitle("");
    setdescription("");
    try {
      const res = await axios.post("/api/todos", { title, description });
      console.log(res.data);
    } catch (error: any) {
      console.log("Error adding todo: ", error.message);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-500 flex flex-col gap-8">
      <div className="border rounded-2xl shadow-lg w-full max-w-2xl mx-auto bg-white p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Todo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter Title"
              className="p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium mb-1">
              Description
            </label>
            <input
              onChange={(e) => setdescription(e.target.value)}
              name="description"
              value={description}
              id="description"
              placeholder="Enter Description"
              className="p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-400 text-white font-semibold py-2 rounded-lg hover:bg-amber-500 transition"
          >
            Add Todo
          </button>
        </form>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-2xl shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Id</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Acctions</th>
            </tr>
          </thead>
          <tbody>
            <Todo />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
