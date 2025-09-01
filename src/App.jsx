import { useState } from "react";
import "./App.css";
import TodoHeader from "./components/TodoHeader";
import TodoItem from "./components/TodoItem";

function App() {
  const todos = [
    { id: 1, title: "Build a rocket ship", isDone: true },
    { id: 2, title: "Learn React components", isDone: true },
    { id: 3, title: "Design Neo-brutalism UI", isDone: true },
    { id: 4, title: "Master JavaScript props", isDone: false },
    { id: 5, title: "Deploy to the moon", isDone: false },
  ];

  const completedCount = todos.filter((todo) => todo.isDone).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Main container with Neo-brutalism styling */}
        <div className="bg-yellow-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none p-8 mb-8">
          <h1 className="text-4xl font-black text-black mb-2 text-center">
            FUTURE TO DO LIST
          </h1>
          <p className="text-lg font-bold text-black text-center mb-6">
            Your mission control dashboard
          </p>

          <TodoHeader total={totalCount} completed={completedCount} />
        </div>

        {/* Todo items container */}
        <div className="space-y-4">
          {todos.map((todo) => (
            <TodoItem key={todo.id} title={todo.title} isDone={todo.isDone} />
          ))}
        </div>

        {/* Footer decoration */}
        <div className="mt-12 text-center">
          <div className="bg-green-300 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none p-4 inline-block">
            <p className="text-xl font-black text-black">Keep coding!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
