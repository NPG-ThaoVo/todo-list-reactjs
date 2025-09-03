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

function EditTaskModal({ initialTitle, onSave }) {
  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (title.trim() === "") return;
    onSave(title.trim());
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-auto h-auto border-3 rounded-lg border-black [box-shadow:2px_2px_0px_#000!important] bg-transparent absolute right-20 top-1/2 transform -translate-y-1/2 px-3 py-1 ml-4">
          <svg
            className="!w-6 !h-6"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <path d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z" />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-4 border-black shadow-[6px_6px_0px_#000] bg-purple-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Task</DialogTitle>
        </DialogHeader>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-3 border-black"
        />
        <DialogFooter>
          <Button
            onClick={handleSave}
            className="border-4 text-black border-black shadow-[4px_4px_0px_#000] bg-green-300"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditTaskModal;
