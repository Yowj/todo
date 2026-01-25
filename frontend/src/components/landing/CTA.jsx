import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Link } from "react-router";

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" id="cta">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          y: [0, -50, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
        animate={{
          y: [0, 50, 0],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-base-content mb-6"
        >
          Ready to get
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            more done?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg sm:text-xl text-base-content/60 mb-12 max-w-2xl mx-auto"
        >
          Join thousands of productive people. Start free, no credit card required.
        </motion.p>

        {/* Email signup form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto mb-8"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-base-200 border border-base-content/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-base-content placeholder:text-base-content/40 transition-all"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 bg-primary text-primary-content font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-shadow flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-success/20 text-success"
            >
              <Check className="w-5 h-5" />
              <span className="font-semibold">Check your inbox for the welcome email!</span>
            </motion.div>
          )}
        </motion.div>

        {/* Alternative CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base-content/50"
        >
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-base-content/40"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>Free forever plan</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
