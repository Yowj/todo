import React, { useState } from "react";
import { EllipsisVertical, Pin, X } from "lucide-react";
import useUpdateTodo from "../hooks/todo/useUpdateTodo";
import useDeleteTodo from "../hooks/todo/useDeleteTodo";

const TodoItem = ({ todo, triggerConfetti }) => {
  const { updateTodoMutate } = useUpdateTodo();
  const { deleteTodoMutate } = useDeleteTodo();

  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [isPinned, setIsPinned] = useState(todo.isPinned);
  const removedAudio = new Audio("/sounds/deleted.mp3");
  const completedAudio = new Audio("/sounds/success.mp3");

  const handleCheckboxClick = (id) => {
    const newCompletedState = !isCompleted;

    setIsCompleted(newCompletedState);
    updateTodoMutate({ todoId: id, updateData: { completed: true } });

    if (newCompletedState === true) {
      completedAudio.play();
      triggerConfetti();
    }
  };

  const handleRemoveTodo = (id) => {
    deleteTodoMutate(id);
    removedAudio.play();
  };

  const handlePinTodo = (id) => {
    const newPinnedState = !isPinned;

    setIsPinned(newPinnedState);
    updateTodoMutate({ todoId: id, updateData: { isPinned: true } });
  };

  return (
    <div
      className={`group flex items-center gap-4 w-full p-4 rounded-xl transition-colors ${
        isPinned
          ? "bg-primary/5 border border-primary/20"
          : isCompleted
          ? "bg-base-200/30"
          : "bg-base-200/50 hover:bg-base-200/70"
      }`}
    >
      <button
        onClick={() => handleCheckboxClick(todo._id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          isCompleted
            ? "bg-success border-success"
            : isPinned
            ? "border-primary hover:bg-primary/10"
            : "border-base-content/20 hover:border-primary"
        }`}
      >
        {isCompleted && (
          <svg className="w-3 h-3 text-success-content" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`break-words transition-all ${
            isCompleted
              ? "line-through text-base-content/40"
              : "text-base-content"
          }`}
        >
          {todo?.title}
        </p>
      </div>

      {isPinned && !isCompleted && (
        <span className="hidden sm:inline text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          Pinned
        </span>
      )}

      <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className={`btn btn-ghost btn-xs btn-circle ${isPinned ? "text-primary" : ""}`}
          onClick={() => handlePinTodo(todo._id)}
          title={isPinned ? "Unpin" : "Pin"}
        >
          <Pin className="w-4 h-4" />
        </button>
        <button
          className="btn btn-ghost btn-xs btn-circle text-error/70 hover:text-error"
          onClick={() => handleRemoveTodo(todo._id)}
          title="Delete"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex sm:hidden items-center dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-xs btn-circle">
          <EllipsisVertical className="w-5 h-5" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-xl z-[1] p-2 shadow-lg border border-base-200 absolute right-0 top-full mt-1 min-w-32"
        >
          <li>
            <button
              className={`flex items-center gap-2 ${isPinned ? "text-primary" : ""}`}
              onClick={() => handlePinTodo(todo._id)}
            >
              <Pin className="w-4 h-4" />
              {isPinned ? "Unpin" : "Pin"}
            </button>
          </li>
          <li>
            <button
              className="flex items-center gap-2 text-error"
              onClick={() => handleRemoveTodo(todo._id)}
            >
              <X className="w-4 h-4" />
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TodoItem;
