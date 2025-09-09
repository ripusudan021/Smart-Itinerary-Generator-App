import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 w-12 h-12 bg-white/10 backdrop-blur-md border border-orange-400/30 rounded-full flex items-center justify-center text-white shadow-lg hover:border-orange-400/60 hover:bg-orange-500/10 transition-all"
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 10px 25px rgba(251, 146, 60, 0.3)"
      }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <motion.div
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
}