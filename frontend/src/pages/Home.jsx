import React, { useState, useRef, useEffect } from "react";
import ConfettiEffect from "../components/Confetti";
import TodoItem from "../components/TodoItem";
import useFetchTodo from "../hooks/todo/useFetchTodo";
import useAddTodo from "../hooks/todo/useAddTodo";

const Home = () => {
  const { data } = useFetchTodo();
  const { addTodoMutate } = useAddTodo();

  const [todo, setTodo] = useState("");
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  // Web Audio API refs
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    const initializeAudio = async () => {
      try {
        const AudioContext = window.AudioContext;
        audioContextRef.current = new AudioContext();
        const response = await fetch("/sounds/added.mp3");

        if (!response.ok) {
          throw new Error(`Failed to fetch audio: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        audioBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);
        setAudioReady(true);
      } catch (error) {
        console.error("❌ Failed to initialize audio:", error);
        setAudioReady(false);
      }
    };

    initializeAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playAudio = () => {
    if (!audioReady || !audioContextRef.current || !audioBufferRef.current) {
      console.warn("🚫 Audio not ready yet");
      return;
    }

    try {
      console.log("🎵 Playing sound instantly...", Date.now());

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContextRef.current.destination);
      source.start(0);
      console.log("🎵 Sound started!", Date.now());
    } catch (error) {
      console.error("❌ Failed to play audio:", error);
    }
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    playAudio();
    const todoText = todo;
    setTodo("");
    addTodoMutate({ title: todoText });
  };

  const triggerConfetti = () => {
    setConfettiTrigger((prev) => prev + 1);
  };

  return (
    <div className=" bg-base-200 py-8 min-h-[calc(100vh-64px)] ">
      <div className="max-w-3xl mx-auto bg-base-100/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 transform hover:shadow-2xl transition-all duration-300 shadow-secondary/50">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent p-4">
          Task Manager
          <span className={`ml-2 text-sm ${audioReady ? "text-green-500" : "text-red-500"}`}>
            {audioReady ? "🔊" : "🔇"}
          </span>
        </h1>
        <p className="text-center text-base-content/60 mb-8 font-light">
          Organize your work efficiently
        </p>

        <form onSubmit={handleAddTodo} className="flex gap-2 mb-8 group">
          <div className="flex-1 relative">
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="What would you like to accomplish?"
              className="input input-bordered w-full pr-12 transition-all duration-300 focus:input-primary"
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary transition-all duration-300">
            Add Task
          </button>
        </form>

        <div className="dyna-puff text-3xl font-bold text-secondary text-center pb-4">
          Current Tasks
        </div>

        <div className="bg-base-200/50 p-6 rounded-xl space-y-3">
          {data?.todos.length === 0 ? (
            <p className="text-center text-xl font-bold">No tasks</p>
          ) : (
            data?.todos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} triggerConfetti={triggerConfetti} />
            ))
          )}
        </div>
      </div>

      <ConfettiEffect trigger={confettiTrigger} />
    </div>
  );
};

export default Home;
