import React, { useState } from "react";
import { X } from "lucide-react";
import useUpdateTodo from "../hooks/todo/useUpdateTodo";
import useDeleteTodo from "../hooks/todo/useDeleteTodo";

const TodoItem = ({ todo, triggerConfetti }) => {
  const { updateTodoMutate } = useUpdateTodo();
  const { deleteTodoMutate } = useDeleteTodo();

  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const removedAudio = new Audio("/sounds/deleted.mp3");
  const completedAudio = new Audio("/sounds/success.mp3");

  const handleCheckboxClick = (id) => {
    const newCompletedState = !isCompleted;

    setIsCompleted(newCompletedState);
    updateTodoMutate({ todoId: id, completed: newCompletedState });

    if (newCompletedState === true) {
      completedAudio.play();
      triggerConfetti();
    }
  };

  const handleRemoveTodo = (id) => {
    deleteTodoMutate(id);
    removedAudio.play();
  };

  return (
    <div className="flex items-center justify-between gap-3 w-full bg-base-100/90 px-4 py-1 rounded-2xl">
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
      <button
        className="btn btn-ghost btn-circle flex-shrink-0 ml-2"
        onClick={() => handleRemoveTodo(todo._id)}
      >
        <X className="text-red-900 size-8" />
      </button>
    </div>
  );
};

export default TodoItem;
