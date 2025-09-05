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

  // State để lưu filter hiện tại ("all" | "active" | "completed")
  const [filter, setFilter] = useState("all");

  // State để lưu text đang search
  const [search, setSearch] = useState("");

  // Đếm số todo đã hoàn thành (lọc những item có isDone = true)
  const completedCount = todos.filter((todo) => todo.isDone).length;

  // Tổng số todo hiện tại
  const totalCount = todos.length;

  // Hàm toggle task done
  // Hàm handleToggle: đổi trạng thái "isDone" của 1 todo theo id
  const handleToggle = (id) => {
    // .map() => duyệt qua mảng todos, trả về mảng MỚI (không sửa trực tiếp mảng cũ)
    const newTodos = todos.map((todo) => {
      // Nếu tìm thấy todo có id trùng với id truyền vào
      if (todo.id === id) {
        // {...todo} = spread operator => copy toàn bộ thuộc tính của todo cũ
        // isDone: !todo.isDone => đảo giá trị boolean (true thành false, false thành true)
        return { ...todo, isDone: !todo.isDone };
      }
      // Nếu không trùng id thì giữ nguyên todo đó
      return todo;
    });

    // setTodos(newTodos) => cập nhật state trong React
    // React sẽ render lại UI dựa trên danh sách mới
    setTodos(newTodos);
  };


  // Hàm handleAddTodo: thêm một công việc (todo) mới
  const handleAddTodo = (title) => {
    // Tạo object todo mới
    const newTodo = {
      id: Date.now(),
      title,             // tiêu đề task được truyền vào hàm
      isDone: false,     // mặc định là chưa hoàn thành
    };

    // Cập nhật state todos
    // [...todos, newTodo] = spread operator => copy toàn bộ todos cũ rồi thêm todo mới vào cuối
    // setTodos() = cập nhật state trong React => UI render lại
    setTodos([...todos, newTodo]);
  };

  // Hàm handleDelete: xóa một todo theo id
  const handleDelete = (id) => {
    // .filter() => duyệt qua mảng todos và giữ lại các todo KHÔNG có id trùng với id cần xóa
    const newTodos = todos.filter((todo) => todo.id !== id);

    // Cập nhật state bằng mảng mới -> React render lại UI
    setTodos(newTodos);
  };

  // Hàm handleEdit: chỉnh sửa tiêu đề (title) của một todo theo id
  const handleEdit = (id, newTitle) => {
    // .map() => duyệt qua toàn bộ todos, tạo mảng mới
    const newTodos = todos.map((todo) => {
      // Nếu tìm thấy todo có id trùng
      if (todo.id === id) {
        // {...todo} = copy toàn bộ object cũ
        // title: newTitle = ghi đè lại thuộc tính title bằng giá trị mới
        return { ...todo, title: newTitle };
      }
      // Nếu không trùng thì giữ nguyên
      return todo;
    });

    // Cập nhật state bằng mảng mới -> UI re-render
    setTodos(newTodos);
  };

  // Hàm getFilteredTodos: trả về danh sách todos sau khi áp dụng filter, search và sort
  const getFilteredTodos = () => {
    // Bắt đầu với toàn bộ todos
    let filtered = todos;

    // 1. Lọc theo trạng thái filter (all | active | completed)
    if (filter === "active") {
      // active = chưa hoàn thành
      filtered = filtered.filter((t) => !t.isDone);
    } else if (filter === "completed") {
      // completed = đã hoàn thành
      filtered = filtered.filter((t) => t.isDone);
    }

    // 2. Lọc theo từ khóa search (nếu có nhập)
    if (search.trim() !== "") {
      filtered = filtered.filter((t) =>
        // toLowerCase() để tìm kiếm không phân biệt hoa thường
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 3. Sắp xếp theo alphabet (localeCompare hỗ trợ nhiều ngôn ngữ)
    filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));

    // Trả về danh sách cuối cùng
    return filtered;
  };

  // useEffect: mỗi khi todos thay đổi -> lưu lại vào localStorage
  useEffect(() => {
    // localStorage chỉ lưu được string, nên cần JSON.stringify để convert array -> string
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // dependency = todos => effect chạy lại khi todos thay đổi

  // useEffect: lắng nghe sự kiện "storage" để sync todos giữa nhiều tab
  useEffect(() => {
    // hàm chạy khi localStorage thay đổi (ở tab khác)
    const handleStorageChange = (event) => {
      // chỉ quan tâm khi key = "todos"
      if (event.key === "todos") {
        const newTodos = JSON.parse(event.newValue); // parse string -> object
        setTodos(newTodos); // update lại state todos
      }
    };

    // đăng ký listener cho event "storage"
    window.addEventListener("storage", handleStorageChange);

    // cleanup: hủy listener khi component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // dependency rỗng => chỉ chạy 1 lần khi mount


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
              className={`px-4 w-full py-2 border-3 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 shadow-[3px_3px_0px_#000] ${filter === "all" ? "bg-yellow-300" : "bg-gray-200"
                }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 w-full bg-green-300 py-2 border-3 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 shadow-[3px_3px_0px_#000]  ${filter === "active" ? "bg-blue-300" : "bg-gray-200"
                }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 bg-orange-300 py-2 w-full border-3 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 shadow-[3px_3px_0px_#000] ${filter === "completed" ? "bg-green-300" : "bg-gray-200"
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
