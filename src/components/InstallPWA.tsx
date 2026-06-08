import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X } from 'lucide-react';
import { Button } from './ui/button';

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS for fallback instructions since iOS doesn't support beforeinstallprompt
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Wait a bit before showing to not overwhelm the user
      setTimeout(() => setIsVisible(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Optional: show fallback prompt on iOS after custom delay
    if (isIosDevice) {
      setTimeout(() => setIsVisible(true), 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      alert("To install on iOS: tap the 'Share' icon at the bottom of Safari, then select 'Add to Home Screen'.");
      return;
    }

    if (!deferredPrompt && !isIOS) {
      alert("Install prompt is not ready. If you are in an iframe or Safari, the native prompt may not be available. Please open the app in a new, standalone Chrome tab.");
      return;
    }
    
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  // Check if we want to render the fallback (e.g., inside iframe or iOS or standard)
  // For standard Chrome where the event hasn't fired yet, it won't render unless isVisible is true.
  // We'll add a manual trigger or just leave it relying on the event/iOS detection.
  if (!isVisible && !isIOS) {
      // In development or if the user is explicitly testing the PWA popup, we can force visibility.
      // But we will stick to native behavior here.
  }

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm"
      >
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-700 dark:text-blue-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Install SwiftCodeDir</p>
              <p className="text-xs text-slate-500">Access bank codes offline</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handleInstallClick} className="bg-[#003399] hover:bg-blue-800 text-white rounded-full px-4 h-8 text-xs">
              Install
            </Button>
            <button onClick={handleDismiss} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
