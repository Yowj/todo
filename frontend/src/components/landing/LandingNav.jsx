import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Testimonials", href: "#testimonials" },
];

const LandingNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const scrollToSection = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-base-100/80 backdrop-blur-xl border-b border-base-content/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Todo
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-base-content/60 hover:text-base-content transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-base-content/5 hover:bg-base-content/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-base-content/60" />
                ) : (
                  <Moon className="w-5 h-5 text-base-content/60" />
                )}
              </motion.button>

              <Link to="/login">
                <button className="text-sm font-medium text-base-content/60 hover:text-base-content transition-colors">
                  Sign In
                </button>
              </Link>

              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 text-sm font-semibold bg-primary text-primary-content rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-shadow"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-base-content/5"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-base-content/60" />
                ) : (
                  <Moon className="w-5 h-5 text-base-content/60" />
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-base-content/5"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-base-content" />
                ) : (
                  <Menu className="w-5 h-5 text-base-content" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          className="md:hidden overflow-hidden bg-base-100/95 backdrop-blur-xl border-b border-base-content/5"
        >
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left text-base-content/60 hover:text-base-content transition-colors"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 border-t border-base-content/10 space-y-3">
              <Link to="/login" className="block">
                <button className="w-full py-2 text-base-content/60 hover:text-base-content transition-colors">
                  Sign In
                </button>
              </Link>
              <Link to="/signup" className="block">
                <button className="w-full py-3 bg-primary text-primary-content font-semibold rounded-lg">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default LandingNav;
