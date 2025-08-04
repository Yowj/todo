import React, { useState } from "react";
import { Pin, X } from "lucide-react";
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
   <div className={`flex items-center justify-between gap-3 w-full bg-base-100/90 px-4 py-1 rounded-2xl ${isPinned ? "bg-primary/60" : ""}`}>
      <div className="flex space-x-3 min-w-0 max-w-full overflow-hidden">
        <input
          type="checkbox"
          checked={isCompleted}
          className="checkbox mt-1"
          onChange={() => handleCheckboxClick(todo._id)}
        />
        <div className="flex-1 min-w-0">
          <p
            className={`dyna-puff break-words text-xl ${
              isCompleted ? "line-through decoration-orange-400 decoration-2" : ""
            }`}
          >
            {todo?.title}
          </p>
        </div>
      </div>
      <div>
        <button className="btn btn-ghost btn-sm" onClick={() => handlePinTodo(todo._id)}>
          <Pin className=" size-5" />
        </button>
        <button
          className="btn btn-ghost btn-circle ml-2"
          onClick={() => handleRemoveTodo(todo._id)}
        >
          <X className="text-red-900 size-8" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
