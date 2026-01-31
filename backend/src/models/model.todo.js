import mongoose from "mongoose";


const todoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    completed: {
      default: false,
      type: Boolean,
      required: true,
    },
    isPinned: {
      default: false,
      type: Boolean,
    }
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
