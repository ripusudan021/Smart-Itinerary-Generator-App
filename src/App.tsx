import { useState } from 'react';
import { motion } from 'motion/react';
import { ThemeProvider } from './components/ThemeProvider';
import { HeroSection } from './components/HeroSection';
import { ItineraryForm } from './components/ItineraryForm';
import { ItineraryResults } from './components/ItineraryResults';
import { Sidebar } from './components/Sidebar';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { AIChatBot } from './components/AIChatBot';

type AppState = 'hero' | 'form' | 'results';

interface FormData {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number[];
  groupSize: number;
  interests: string[];
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('hero');
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleGetStarted = () => {
    setAppState('form');
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setAppState('results');
  };

  const handleEdit = () => {
    setAppState('form');
  };

  const handleBack = () => {
    setAppState('hero');
    setFormData(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen relative">
        {/* Global UI Elements */}
        <LanguageToggle />
        <ThemeToggle />
        
        {/* Global AI Chatbot */}
        <AIChatBot />
        
        {/* Sidebar - only show when we have form data */}
        {formData && appState === 'results' && (
          <Sidebar destination={formData.destination} />
        )}

        {/* Page Content with Smooth Transitions */}
        <motion.div
          key={appState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {appState === 'hero' && (
            <HeroSection onGetStarted={handleGetStarted} />
          )}

          {appState === 'form' && (
            <ItineraryForm 
              onSubmit={handleFormSubmit} 
              onBack={handleBack}
            />
          )}

          {appState === 'results' && formData && (
            <ItineraryResults 
              formData={formData}
              onEdit={handleEdit}
              onBack={handleBack}
            />
          )}
        </motion.div>

        {/* Futuristic Grid Pattern */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-emerald-500/5" />
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(251, 146, 60, 0.1)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Data Nodes */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                rotate: [0, 360],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-emerald-400 rounded-full opacity-60">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-emerald-400 rounded-full animate-ping" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advanced Background Effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-orange-900/5 via-transparent to-emerald-900/5 pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(251,146,60,0.1)_0%,transparent_50%)] pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.1)_0%,transparent_50%)] pointer-events-none" />
      </div>
    </ThemeProvider>
  );
}