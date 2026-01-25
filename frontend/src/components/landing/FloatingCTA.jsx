import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const FloatingCTA = () => {
  const { scrollYProgress } = useScroll();

  // Only show after scrolling past hero (roughly 0.15 of page)
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15], [100, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link to="/signup">
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2 px-5 py-3 bg-primary text-primary-content font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
        >
          <span className="hidden sm:inline">Get Started</span>
          <span className="sm:hidden">Start</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default FloatingCTA;
