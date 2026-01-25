import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    content: "Finally, a todo app that doesn't get in my way. It's become essential to my daily routine.",
    author: "Sarah Chen",
    role: "Product Designer",
    avatar: "SC",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    content: "The simplicity is what sold me. No learning curve, just start adding tasks and get things done.",
    author: "Marcus Johnson",
    role: "Software Engineer",
    avatar: "MJ",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    content: "I've tried dozens of productivity apps. This is the only one that stuck. Clean, fast, perfect.",
    author: "Emily Rodriguez",
    role: "Startup Founder",
    avatar: "ER",
    gradient: "from-purple-500 to-violet-500",
  },
];

const logos = [
  { name: "Vercel", letter: "V" },
  { name: "Stripe", letter: "S" },
  { name: "Linear", letter: "L" },
  { name: "Notion", letter: "N" },
  { name: "Figma", letter: "F" },
];

const TestimonialCard = ({ testimonial, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative group"
    >
      <div className="relative p-8 rounded-2xl bg-base-200/50 border border-base-content/5 hover:border-primary/20 transition-all duration-300">
        {/* Quote icon */}
        <Quote className="w-8 h-8 text-primary/20 mb-4" />

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          ))}
        </div>

        {/* Content */}
        <p className="text-base-content/80 text-lg leading-relaxed mb-6">
          "{testimonial.content}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold`}>
            {testimonial.avatar}
          </div>
          <div>
            <div className="font-semibold text-base-content">{testimonial.author}</div>
            <div className="text-sm text-base-content/50">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SocialProof = () => {
  const headerRef = useRef(null);
  const logosRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isLogosInView = useInView(logosRef, { once: true, margin: "-50px" });

  return (
    <section className="relative py-32 bg-base-100 overflow-hidden" id="testimonials">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-base-content mb-6"
          >
            Loved by thousands
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-base-content/60"
          >
            Join a community of productive people who've simplified their workflow.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Logo Wall */}
        <div ref={logosRef}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isLogosInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-sm text-base-content/40 uppercase tracking-wider mb-8"
          >
            Trusted by teams at
          </motion.p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isLogosInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-2 text-base-content/30 hover:text-base-content/60 transition-colors"
              >
                <span className="w-10 h-10 rounded-lg bg-base-content/10 flex items-center justify-center font-bold text-lg">
                  {logo.letter}
                </span>
                <span className="font-semibold text-lg hidden sm:block">{logo.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
