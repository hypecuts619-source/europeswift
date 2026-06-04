import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookmarkPlus } from 'lucide-react';
import { Button } from './ui/button';

export function BookmarkPrompt() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or bookmarked
    const hasSeenPrompt = localStorage.getItem('hasSeenBookmarkPrompt');
    
    if (!hasSeenPrompt) {
      // Show prompt after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenBookmarkPrompt', 'true');
  };

  const getShortcut = () => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    return isMac ? '⌘ + D' : 'Ctrl + D';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 pr-10 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-xl pointer-events-none"></div>
            
            <button 
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-white/50 dark:bg-slate-900/50 rounded-full p-1 z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex gap-4 items-start relative z-10">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
                  <BookmarkPlus className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-sm mb-1">
                  Save this tool for later!
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-3">
                  Press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-[10px] font-mono font-medium text-slate-700 dark:text-slate-300 shadow-sm">{getShortcut()}</kbd> to bookmark Swiftcodedir for quick access next time.
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-xs shrink-0"
                    onClick={handleDismiss}
                  >
                    Not now
                  </Button>
                  <Button 
                    size="sm" 
                    className="h-8 text-xs shrink-0 bg-[#003399] hover:bg-blue-800 text-white"
                    onClick={handleDismiss}
                  >
                    Got it
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
