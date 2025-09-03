import { useState, useEffect } from "react";
import "./App.css";
import TodoHeader from "./components/TodoHeader";
import TodoItem from "./components/TodoItem";
import AddTaskModal from "./components/AddTaskModal";

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos
      ? JSON.parse(storedTodos)
      : [
          { id: 1, title: "Build a rocket ship", isDone: true },
          { id: 2, title: "Learn React components", isDone: true },
          { id: 3, title: "Design Neo-brutalism UI", isDone: true },
          { id: 4, title: "Master JavaScript props", isDone: false },
          { id: 5, title: "Deploy to the moon", isDone: false },
        ];
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const completedCount = todos.filter((todo) => todo.isDone).length;
  const totalCount = todos.length;

  // Hàm toggle task done
  const handleToggle = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // add todo
  const handleAddTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
  };

  //delete task
  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  //edit task
  const handleEdit = (id, newTitle) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const getFilteredTodos = () => {
    let filtered = todos;
    if (filter === "active") {
      filtered = filtered.filter((t) => !t.isDone);
    } else if (filter === "completed") {
      filtered = filtered.filter((t) => t.isDone);
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    return filtered;
  };

  //mỗi khi todos thay đổi, luu vao local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "todos") {
        const newTodos = JSON.parse(event.newValue);
        setTodos(newTodos);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
          <AddTaskModal onAddTodo={handleAddTodo} />
          {/* filter button */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 w-full py-2 border-3 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 shadow-[3px_3px_0px_#000] ${
                filter === "all" ? "bg-yellow-300" : "bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 w-full bg-green-300 py-2 border-3 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 shadow-[3px_3px_0px_#000]  ${
                filter === "active" ? "bg-blue-300" : "bg-gray-200"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 bg-orange-300 py-2 w-full border-3 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 shadow-[3px_3px_0px_#000] ${
                filter === "completed" ? "bg-green-300" : "bg-gray-200"
              }`}
            >
              Completed
            </button>
          </div>
          {/* Search box */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mt-6 p-3 border-3 border-black 
                     shadow-[3px_3px_0px_#000] focus:outline-none 
                     bg-white placeholder-gray-400"
          />
        </div>

        {/* Todo items container */}
        <div className="space-y-4">
          {getFilteredTodos().map((todo) => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              isDone={todo.isDone}
              onToggle={() => handleToggle(todo.id)}
              onDelete={() => handleDelete(todo.id)}
              onEdit={(newTitle) => handleEdit(todo.id, newTitle)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
