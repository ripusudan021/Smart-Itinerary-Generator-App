import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Zap, ArrowRight, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useRef } from 'react';

const dataNodes = [
  { x: '15%', y: '20%', size: 'small', delay: 0 },
  { x: '25%', y: '35%', size: 'medium', delay: 0.2 },
  { x: '18%', y: '50%', size: 'large', delay: 0.4 },
  { x: '22%', y: '65%', size: 'small', delay: 0.6 },
  { x: '30%', y: '80%', size: 'medium', delay: 0.8 },
  { x: '70%', y: '25%', size: 'large', delay: 1.0 },
  { x: '75%', y: '40%', size: 'small', delay: 1.2 },
  { x: '80%', y: '55%', size: 'medium', delay: 1.4 },
  { x: '85%', y: '70%', size: 'small', delay: 1.6 },
];

export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <motion.div 
      ref={ref}
      style={{ y, opacity }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black"
    >
      {/* Futuristic Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZnV0dXJpc3RpYyUyMGRpZ2l0YWx8ZW58MXx8fHwxNzU3NDI1MTM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Futuristic technology background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
      </div>

      {/* Dynamic Data Visualization */}
      {dataNodes.map((node, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: node.x, top: node.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 0.8, 1],
            opacity: [0, 0.8, 0.6, 0.8]
          }}
          transition={{
            duration: 2,
            delay: node.delay,
            repeat: Infinity,
            repeatDelay: 4
          }}
        >
          <motion.div
            className={`
              ${node.size === 'small' ? 'w-2 h-2' : node.size === 'medium' ? 'w-3 h-3' : 'w-4 h-4'}
              bg-gradient-to-r from-orange-400 to-emerald-400 rounded-full relative
            `}
            animate={{ 
              boxShadow: [
                '0 0 0 0 rgba(251, 146, 60, 0.4)',
                '0 0 0 10px rgba(251, 146, 60, 0)',
                '0 0 0 0 rgba(251, 146, 60, 0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Connection Lines */}
            <motion.div
              className="absolute top-1/2 left-full w-8 h-px bg-gradient-to-r from-orange-400/60 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: node.delay + 0.5, duration: 1 }}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div 
          className="text-center max-w-5xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* AI Badge */}
          <motion.div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500/20 to-emerald-500/20 backdrop-blur-xl border border-orange-400/30 rounded-full px-6 py-3 mb-8"
            initial={{ scale: 0, rotateX: 90 }}
            animate={{ scale: 1, rotateX: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(251, 146, 60, 0.3)" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-orange-400" />
            </motion.div>
            <span className="text-white/90 font-medium">Next-Gen AI Travel Intelligence</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="mb-6 bg-gradient-to-r from-orange-300 via-amber-200 to-emerald-300 bg-clip-text text-transparent"
            style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
          >
            Smart Itinerary
            <br />
            <motion.span
              className="relative"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              style={{
                background: "linear-gradient(90deg, #f97316, #10b981, #f97316)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Generator
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="mb-10 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            Harness advanced AI algorithms and real-time data processing to create 
            <span className="text-orange-400"> personalized travel experiences</span> with 
            intelligent route optimization and dynamic adaptation.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <motion.button
              onClick={onGetStarted}
              className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-emerald-600 text-white rounded-2xl shadow-2xl overflow-hidden font-medium text-lg"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px rgba(251, 146, 60, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-orange-500 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.8 }}
              />
              
              <span className="relative z-10 flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              className="group px-10 py-5 bg-white/5 backdrop-blur-xl border-2 border-white/20 text-white rounded-2xl hover:bg-white/10 hover:border-orange-400/50 transition-all font-medium text-lg"
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 15px 30px rgba(255, 255, 255, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </span>
            </motion.button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {['AI-Powered', 'Real-time Updates', 'Multi-language', 'IRCTC Integration'].map((feature, index) => (
              <motion.div
                key={feature}
                className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-default"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {feature}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-8 h-14 border-2 border-orange-400/50 rounded-full flex justify-center relative"
          whileHover={{ borderColor: "rgba(251, 146, 60, 0.8)" }}
        >
          <motion.div
            className="w-1.5 h-4 bg-gradient-to-b from-orange-400 to-emerald-400 rounded-full mt-3"
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -inset-2 border border-orange-400/20 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-emerald-500/20 to-transparent rounded-tl-full" />
    </motion.div>
  );
}