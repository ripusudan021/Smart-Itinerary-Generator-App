import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Languages, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
];

export function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);

  const selectLanguage = (lang: typeof languages[0]) => {
    setCurrentLang(lang);
    setIsOpen(false);
  };

  return (
    <motion.div
      className="fixed top-4 left-4 z-50"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-emerald-400/30 rounded-full text-white shadow-lg hover:border-emerald-400/60 hover:bg-emerald-500/10 transition-all"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Languages className="w-4 h-4" />
          <span className="text-sm">{currentLang.flag}</span>
          <span className="text-sm hidden sm:block">{currentLang.name}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 left-0 min-w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden"
            >
              {languages.map((lang, index) => (
                <motion.button
                  key={lang.code}
                  onClick={() => selectLanguage(lang)}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                    currentLang.code === lang.code
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'text-white hover:bg-white/10 hover:text-emerald-300'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                  {currentLang.code === lang.code && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-orange-400 rounded-full"
                      layoutId="selected-lang"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}