import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { DownloadAppModal } from './DownloadAppModal';
import { Download, Smartphone, Laptop, Sparkles } from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'hero' | 'floating' | 'banner';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  const { isInstallable, install } = usePWAInstall();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = async () => {
    // If browser supports direct install prompt, trigger it, otherwise show modal
    if (isInstallable) {
      const success = await install();
      if (!success) {
        setModalOpen(true);
      }
    } else {
      setModalOpen(true);
    }
  };

  if (variant === 'navbar') {
    return (
      <>
        <button
          onClick={handleClick}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg bg-stone-900 text-stone-100 hover:bg-stone-800 border border-amber-400/50 shadow-sm transition-all cursor-pointer group ${className}`}
          title="Download Educare as an app on phone or computer"
        >
          <span className="text-amber-400 font-bold text-xs">▶</span>
          <span className="hidden md:inline">Google Play &amp; App</span>
          <span className="md:hidden">Get App</span>
          <span className="hidden xl:flex items-center gap-1 text-[10px] text-stone-400 pl-1 border-l border-stone-700">
            <Smartphone className="w-3 h-3 text-emerald-400" />
            <Laptop className="w-3 h-3 text-amber-400" />
          </span>
        </button>

        <DownloadAppModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  // Hero / Default button
  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 shadow-sm transition-all cursor-pointer group ${className}`}
      >
        <span className="text-emerald-600 font-bold text-sm">▶</span>
        <span>Get Educare App (Google Play &amp; PC)</span>
        <span className="flex items-center gap-1 text-[11px] text-stone-500 pl-1.5 border-l border-stone-200">
          <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
          <Laptop className="w-3.5 h-3.5 text-amber-600" />
        </span>
      </button>

      <DownloadAppModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
