import React from "react";
import { Link } from "react-router";
import { Check, ArrowRight, Zap, Shield, Smartphone, Star, Pin, Sparkles } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Landing Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">TaskFlow</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 text-sm font-medium bg-white text-black rounded-full hover:bg-white/90 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-white/70">Now with confetti celebrations</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-6">
            Your brain
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              deserves a break.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-lg mb-10">
            Stop holding everything in your head. Dump it here, check it off, move on with your life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-20">
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all"
            >
              Start free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Sign in
            </Link>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[140px] md:auto-rows-[160px]">

            {/* Card 1 - Task Demo (Large) */}
            <div className="col-span-2 row-span-2 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm font-medium text-white/70">Live Preview</span>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-white/40 line-through">Morning workout</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <div className="w-5 h-5 rounded-full border-2 border-purple-400" />
                  <span className="text-sm text-white/90">Ship new feature</span>
                  <Pin className="w-3 h-3 text-purple-400 ml-auto" />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                  <span className="text-sm text-white/60">Call mom back</span>
                </div>
              </div>
            </div>

            {/* Card 2 - Stat */}
            <div className="col-span-1 rounded-3xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 backdrop-blur-xl p-5 flex flex-col justify-between">
              <Zap className="w-6 h-6 text-purple-400" />
              <div>
                <p className="text-3xl font-bold">2.4k</p>
                <p className="text-xs text-white/50">Tasks done today</p>
              </div>
            </div>

            {/* Card 3 - Feature */}
            <div className="col-span-1 rounded-3xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20 backdrop-blur-xl p-5 flex flex-col justify-between">
              <Shield className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-sm font-medium">Secure</p>
                <p className="text-xs text-white/50">Your data stays yours</p>
              </div>
            </div>

            {/* Card 4 - Wide card */}
            <div className="col-span-2 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl p-5 flex items-center gap-4">
              <div className="flex -space-x-3">
                {['#f472b6', '#a78bfa', '#60a5fa', '#34d399'].map((color, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Join 12,000+ users</p>
                <p className="text-xs text-white/50">who finish what they start</p>
              </div>
            </div>

            {/* Card 5 - Feature */}
            <div className="col-span-1 rounded-3xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/20 backdrop-blur-xl p-5 flex flex-col justify-between">
              <Smartphone className="w-6 h-6 text-orange-400" />
              <div>
                <p className="text-sm font-medium">Works anywhere</p>
                <p className="text-xs text-white/50">Any device</p>
              </div>
            </div>

            {/* Card 6 - Testimonial */}
            <div className="col-span-2 md:col-span-3 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl p-6 flex flex-col justify-between">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-white/70 italic mb-4">
                "Finally a todo app that doesn't try to be a project management suite. Just works."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400" />
                <div>
                  <p className="text-sm font-medium">Sarah K.</p>
                  <p className="text-xs text-white/40">Freelance Designer</p>
                </div>
              </div>
            </div>

            {/* Card 7 - Confetti feature */}
            <div className="col-span-2 md:col-span-2 rounded-3xl bg-gradient-to-br from-pink-500/20 to-pink-500/5 border border-pink-500/20 backdrop-blur-xl p-5 flex flex-col justify-between relative overflow-hidden">
              <Sparkles className="w-6 h-6 text-pink-400" />
              <div>
                <p className="text-sm font-medium">Celebration mode</p>
                <p className="text-xs text-white/50">Confetti on every win</p>
              </div>
              {/* Decorative confetti pieces */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-sm rotate-12" />
              <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-pink-400 rounded-full" />
              <div className="absolute bottom-12 right-6 w-2 h-2 bg-blue-400 rounded-sm -rotate-12" />
            </div>

            {/* Card 8 - CTA */}
            <div className="col-span-2 md:col-span-1 rounded-3xl bg-gradient-to-br from-green-500/30 to-green-500/10 border border-green-500/30 backdrop-blur-xl p-5 flex flex-col justify-center items-center text-center">
              <p className="text-sm font-medium mb-2">Ready?</p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1 text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Less thinking.
              <br />
              <span className="text-white/40">More doing.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant capture</h3>
              <p className="text-white/50 leading-relaxed">
                Thought pops in? Type it out in seconds. No folders, no labels, no friction.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Pin className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pin what matters</h3>
              <p className="text-white/50 leading-relaxed">
                One important task at a time. Pin it, focus on it, crush it.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Feel the dopamine</h3>
              <p className="text-white/50 leading-relaxed">
                Check something off and watch confetti rain. Small wins matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <span className="text-sm text-white/70">Free forever. No credit card.</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Stop planning.
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Start doing.
            </span>
          </h2>

          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
            Your todo list shouldn't be another source of stress. Keep it simple. Keep it moving.
          </p>

          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all text-lg"
          >
            Create free account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 lg:px-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">TaskFlow</span>
          </div>
          <p className="text-sm text-white/40">
            Built for doers. Not planners.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
