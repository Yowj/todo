import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Target, Sparkles, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Add tasks in seconds. No loading screens, no waiting. Just pure speed.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Target,
    title: "Stay Focused",
    description: "Pin important tasks and organize by categories. See what matters most.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Sparkles,
    title: "Delightful Experience",
    description: "Celebrate completions with satisfying sounds and animations.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and protected. Only you can see your tasks.",
    gradient: "from-green-500 to-emerald-500",
  },
];

const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative p-8 rounded-2xl bg-base-200/50 border border-base-content/5 hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}
        >
          <feature.icon className="w-6 h-6 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold text-base-content mb-3">{feature.title}</h3>
        <p className="text-base-content/60 leading-relaxed">{feature.description}</p>

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
};

const Features = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 bg-base-100 overflow-hidden" id="features">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-base-200/50 via-transparent to-base-200/50" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4"
          >
            Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-base-content mb-6"
          >
            Everything you need.
            <br />
            <span className="text-base-content/40">Nothing you don't.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-base-content/60"
          >
            We've stripped away the complexity so you can focus on what matters — getting things done.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
