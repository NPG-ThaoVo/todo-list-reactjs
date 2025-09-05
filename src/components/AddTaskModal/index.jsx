import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function AddTaskModal({ onAddTodo }) {
  // State lưu nội dung input khi user gõ task mới
  const [title, setTitle] = useState("");

  // State điều khiển modal (true = mở, false = đóng)
  const [open, setOpen] = useState(false);

  // Hàm submit khi thêm task mới
  const handleSubmit = () => {
    if (title.trim() === "") return;   // chặn khi user bấm save nhưng input rỗng
    onAddTodo(title);                  // gọi callback từ cha để thêm task mới
    setTitle("");                      // reset input về rỗng sau khi thêm
    setOpen(false);                    // đóng modal lại
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-green-300 w-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none p-4 inline-block hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <p className="text-xl font-black text-black">Add New Task</p>
        </button>
      </DialogTrigger>
      <DialogContent className="border-4 border-black shadow-[6px_6px_0px_#000] bg-pink-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Task</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-3 border-black"
        />
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="border-4 border-black shadow-[4px_4px_0px_#000] bg-green-300 !text-black font-bold hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all duration-200"
          >
            Save Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskModal;
