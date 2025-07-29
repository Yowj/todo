import errorHandler from "../middlewares/middleware.error.js";
import protectRoute from "../middlewares/middleware.protect.js";
import Todo from "../models/model.todo.js";
import express from "express";

const router = express.Router();

router.use(protectRoute);
router.get("/fetch-todo", async (req, res) => {
  try {
    const user = req.user;
    const todos = await Todo.find({ user: user._id });
    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      todos,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.post("/add-todo", async (req, res) => {
  try {
    const user = req.user;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const todo = await Todo.create({
      title,
      completed: false,
      user: user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Todo added successfully",
      todo,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.delete("/delete-todo/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    await Todo.findByIdAndDelete(todoId);

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.put("/update-todo/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const { completed } = req.body; 
    
    const todo = await Todo.findByIdAndUpdate(
      todoId, 
      { completed }, 
      { new: true }
    );
    
    await todo.save();
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

export default router;
