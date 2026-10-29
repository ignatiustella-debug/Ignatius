import React, { useState } from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff, CheckCircle2, ChevronRight, X } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [dismissed, setDismissed] = useState(false);

  if (isOnline || dismissed) return null;

  return (
    <aside aria-label="Offline Mode" className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-xl bg-stone-900 text-stone-100 border border-amber-500/50 px-4 py-2.5 text-xs shadow-2xl animate-fade-in max-w-md">
      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
        <WifiOff className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <div className="font-bold text-amber-300 flex items-center gap-1.5">
          <span>Offline Mode Active</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <p className="text-stone-300 text-[11px] mt-0.5 leading-snug">
          All 7 Educare courses & 350 lessons are cached and fully accessible offline!
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss offline notice"
        className="p-1 text-stone-400 hover:text-white rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </aside>
  );
};
