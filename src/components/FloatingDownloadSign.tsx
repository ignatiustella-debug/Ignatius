import React, { useState } from 'react';
import { Download, Smartphone, Laptop, Sparkles, X } from 'lucide-react';
import { DownloadAppModal } from './DownloadAppModal';
import { EducareLogo } from './EducareLogo';

export const FloatingDownloadSign: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  return (
    <>
      {/* Floating Download Sign */}
      <div className="fixed bottom-5 right-5 z-40 transition-all">
        {!minimized ? (
          <div className="relative group bg-stone-900/95 backdrop-blur-md text-white border border-amber-400/40 rounded-2xl p-3.5 shadow-2xl flex items-center gap-3.5 max-w-xs hover:border-amber-400 transition-all">
            <button
              onClick={() => setMinimized(true)}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center text-xs border border-stone-700 shadow-sm cursor-pointer"
              title="Minimize sign"
              aria-label="Minimize download banner"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="relative shrink-0">
              <EducareLogo size="sm" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shadow-xs">
                <Download className="w-2.5 h-2.5 stroke-[2.5]" />
              </div>
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                <span className="text-[11px]">▶</span>
                <span>Google Play &amp; App</span>
              </div>
              <div className="text-xs font-bold text-white truncate">
                Download for Phone / PC
              </div>
              <div className="flex items-center gap-2 text-[10px] text-stone-300 mt-0.5">
                <span className="flex items-center gap-0.5">
                  <Smartphone className="w-3 h-3 text-emerald-400" /> Android
                </span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <Laptop className="w-3 h-3 text-amber-400" /> PC / Mac
                </span>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-stone-950 text-xs font-black transition-all shadow-md cursor-pointer shrink-0"
            >
              Get App
            </button>
          </div>
        ) : (
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-stone-900/95 border border-amber-400/60 text-white shadow-xl hover:bg-stone-800 transition-all cursor-pointer group"
            title="Download Educare as an app for phone or computer"
          >
            <span className="text-amber-400 font-bold text-xs">▶</span>
            <span className="text-xs font-bold">Google Play &amp; App</span>
            <span className="flex items-center gap-1 text-[11px] text-stone-400 border-l border-stone-700 pl-1.5">
              <Smartphone className="w-3 h-3 text-emerald-400" />
              <Laptop className="w-3 h-3 text-amber-400" />
            </span>
          </button>
        )}
      </div>

      {/* Universal Download App Modal */}
      <DownloadAppModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
