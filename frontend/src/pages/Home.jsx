import React, { useState, useRef, useEffect, useMemo } from "react";
import ConfettiEffect from "../components/Confetti";
import TodoItem from "../components/TodoItem";
import useFetchTodo from "../hooks/todo/useFetchTodo";
import useAddTodo from "../hooks/todo/useAddTodo";
import { motion, AnimatePresence } from "framer-motion";
import useAuthUser from "../hooks/auth/useAuth";

const Home = () => {
  const { data } = useFetchTodo();
  const { authUser } = useAuthUser();

  const { addTodoMutate } = useAddTodo();

  const [todo, setTodo] = useState("");
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  // Web Audio API refs
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);

  const [audioReady, setAudioReady] = useState(false);

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (data?.todos.length > 0) {
      setIsInitialLoad(false);
    }
  }, [data?.todos]);

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

  const sortedTodos = useMemo(
    () => [...(data?.todos || [])].sort((a, b) => b.isPinned - a.isPinned),
    [data?.todos]
  );

  return (
    <div className=" bg-base-200 min-h-[calc(100vh-64px)] ">
      <div className="max-w-3xl mx-auto bg-base-300 backdrop-blur-sm rounded-xl shadow-2xl p-8 sm:p-6 md:p-8 transform  transition-all duration-300 shadow-secondary/50">
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent p-4 dyna-puff"
        >
          Task Manager
        </motion.h1>
        <p className="text-center mb-8">
          {data?.todos.length === 0 ? (
            <>
              Way to go, <span className="text-primary font-bold">{authUser?.fullName}</span>! All
              tasks conquered! ✨
            </>
          ) : (
            <>
              Time to conquer your day,{" "}
              <span className="text-primary font-bold text-xl">{authUser?.fullName}! 🔥</span>
            </>
          )}
        </p>

        <form onSubmit={handleAddTodo} className="flex gap-2 mb-8">
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="What would you like to accomplish?"
              className="input input-bordered w-full pr-12 focus:input-primary"
            />
          </motion.div>

          <motion.button
            type="submit"
            className="btn btn-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: 0.1,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Task
          </motion.button>
        </form>

        <div className="bg-base-200/50  sm:p-6 md:p-8 rounded-xl space-y-3">
          <AnimatePresence mode="popLayout">
            {data?.todos.length === 0 ? (
              <p className="text-center text-xl font-bold">No tasks</p>
            ) : (
              sortedTodos.map((todo, index) => (
                <motion.div
                  key={todo._id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "easeInOut",
                      duration: 1,
                      delay: isInitialLoad ? index * 0.3 : 0,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 90,
                    scale: 1,
                    transition: { duration: 0.5 },
                  }}
                >
                  <TodoItem key={todo._id} todo={todo} triggerConfetti={triggerConfetti} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      <ConfettiEffect trigger={confettiTrigger} />
    </div>
  );
};

export default Home;
