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
    <div className="bg-base-100 min-h-[calc(100vh-64px)] py-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold mb-2"
        >
          Your tasks
        </motion.h1>
        <p className="text-base-content/60 mb-8">
          {data?.todos.length === 0 ? (
            <>All done, {authUser?.fullName}. Nothing left to do.</>
          ) : (
            <>Hey {authUser?.fullName}, you have {data?.todos.length} {data?.todos.length === 1 ? 'task' : 'tasks'} to tackle.</>
          )}
        </p>

        <form onSubmit={handleAddTodo} className="flex gap-3 mb-8">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="input input-bordered w-full bg-base-200/50 border-base-300 focus:border-primary focus:outline-none"
            />
          </motion.div>

          <motion.button
            type="submit"
            className="btn btn-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileTap={{ scale: 0.98 }}
          >
            Add
          </motion.button>
        </form>

        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {data?.todos.length === 0 ? (
              <div className="text-center py-16 text-base-content/40">
                <p className="text-lg">No tasks yet</p>
                <p className="text-sm mt-1">Add one above to get started</p>
              </div>
            ) : (
              sortedTodos.map((todo, index) => (
                <motion.div
                  key={todo._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.3,
                      delay: isInitialLoad ? index * 0.05 : 0,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                    transition: { duration: 0.2 },
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
