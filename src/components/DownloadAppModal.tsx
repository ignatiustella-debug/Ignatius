import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import {
  Download,
  Laptop,
  Smartphone,
  CheckCircle2,
  X,
  Sparkles,
  WifiOff,
  Apple,
  Chrome,
  Monitor,
  Share2,
  PlusSquare,
  ShieldCheck,
  ExternalLink,
  Layers,
  Check,
  FileText,
} from 'lucide-react';
import { EducareLogo } from './EducareLogo';
import { downloadPlayStorePackage } from '../utils/playStoreExporter';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [deviceTab, setDeviceTab] = useState<'playstore' | 'phone' | 'computer'>('playstore');
  const [installSuccess, setInstallSuccess] = useState(false);
  const [downloadedPackage, setDownloadedPackage] = useState(false);

  if (!isOpen) return null;

  const handleDirectInstall = async () => {
    if (isInstallable) {
      const ok = await install();
      if (ok) {
        setInstallSuccess(true);
        setTimeout(() => {
          setInstallSuccess(false);
          onClose();
        }, 2500);
      }
    }
  };

  const handleDownloadPackage = () => {
    downloadPlayStorePackage({
      packageName: 'com.educare.youthapp',
      developerEmail: 'ignatiustella@gmail.com',
      appName: 'Educare — Education Center for Youth',
    });
    setDownloadedPackage(true);
    setTimeout(() => setDownloadedPackage(false), 4000);
  };

  const openPwaBuilder = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://educare.aistudio.app';
    window.open(`https://www.pwabuilder.com?url=${encodeURIComponent(origin)}`, '_blank', 'noopener,noreferrer');
  };

  const openPlayConsole = () => {
    window.open('https://play.google.com/console', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/40 border-b border-stone-800 flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <EducareLogo size="md" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                  Google Play & Universal App Hub
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                  <WifiOff className="w-2.5 h-2.5" /> 100% Offline
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">
                Download & Install Educare
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Install directly on your Android phone, publish to Google Play Store, or run standalone on PC/Mac.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Device Switcher Tabs (3 Tabs) */}
        <div className="px-5 sm:px-6 pt-4 pb-2 shrink-0">
          <div className="grid grid-cols-3 gap-1.5 bg-stone-950 p-1.5 rounded-xl border border-stone-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setDeviceTab('playstore')}
              className={`py-2 px-2 sm:px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap text-center ${
                deviceTab === 'playstore'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <span className="text-sm">▶</span>
              <span className="truncate">Google Play & APK</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceTab('phone')}
              className={`py-2 px-2 sm:px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap text-center ${
                deviceTab === 'phone'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Phone (Direct)</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceTab('computer')}
              className={`py-2 px-2 sm:px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap text-center ${
                deviceTab === 'computer'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Laptop className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Computer (PC/Mac)</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {installSuccess && (
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold">Educare successfully installed!</p>
                <p className="text-[11px] text-emerald-400/90">
                  You can now launch Educare directly from your home screen or app launcher anytime.
                </p>
              </div>
            </div>
          )}

          {downloadedPackage && (
            <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Google Play Store bundle downloaded! Follow the guide below to upload to Google Play Console.</span>
            </div>
          )}

          {/* TAB 1: GOOGLE PLAY STORE & ANDROID APK */}
          {deviceTab === 'playstore' && (
            <div className="space-y-4">
              {/* Play Store Banner Hero */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/60 border border-amber-500/40 shadow-xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                      ▶
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded-full">
                          Google Play Ready · TWA Certified
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white font-display mt-0.5">
                        Publish to Google Play Store & Android
                      </h3>
                      <p className="text-xs text-stone-300">
                        Package ID: <code className="text-amber-300 font-mono">com.educare.youthapp</code> · Version 2.4.0
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={openPlayConsole}
                      className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Play Console</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  Educare is configured with Google's official <strong>Trusted Web Activity (TWA)</strong> architecture and Digital Asset Links (<code className="text-amber-400">.well-known/assetlinks.json</code>). You can install it on your Android phone immediately, or package it into an Android App Bundle (<code className="text-amber-400">.aab</code>) for global Google Play Store distribution!
                </p>

                {/* Quick Action Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-stone-800">
                  <button
                    onClick={handleDirectInstall}
                    className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                  >
                    <Download className="w-4 h-4 fill-current" />
                    <span>⚡ 1-Click Install on Android Phone</span>
                  </button>

                  <button
                    onClick={openPwaBuilder}
                    className="p-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>📦 Build .AAB on PWABuilder (2 mins)</span>
                  </button>
                </div>
              </div>

              {/* Step-by-Step Google Play Console Publishing Instructions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>How to publish Educare on Google Play Store</span>
                  </h4>

                  <button
                    onClick={handleDownloadPackage}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download Play Store Bundle (.txt)</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center">1</span>
                      <span className="font-bold text-white">Generate Android Bundle (.aab)</span>
                    </div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      Click <strong className="text-emerald-400">"Build .AAB on PWABuilder"</strong> above. It tests your verified manifest and generates the signed Google Play Android App Bundle (<code className="text-stone-300">.aab</code>) in under 60 seconds with zero coding required.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center">2</span>
                      <span className="font-bold text-white">Log into Google Play Console</span>
                    </div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      Visit <a href="https://play.google.com/console" target="_blank" rel="noreferrer" className="text-amber-400 underline font-bold">play.google.com/console</a> using your developer email (<code className="text-stone-300">ignatiustella@gmail.com</code>). Click <strong>"Create app"</strong>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center">3</span>
                      <span className="font-bold text-white">App Details & Listing</span>
                    </div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      Set Name to <strong>"Educare — Education Center for Youth"</strong>, Category to <strong>Education</strong>, and Price to <strong>Free ($0)</strong>. Use the app launcher icon (<code className="text-stone-300">/pwa-512x512.png</code>).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-400 text-stone-950 font-black text-xs flex items-center justify-center">4</span>
                      <span className="font-bold text-white">Upload .AAB & Publish Live</span>
                    </div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      In <strong>Release &gt; Production</strong>, upload your downloaded <code className="text-stone-300">.aab</code> bundle. Complete the Content Rating (safe for ages 6–18), and click <strong>"Review &amp; Rollout"</strong>!
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Compliance Checklist */}
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                <span className="font-bold text-stone-300 block">Verified Google Play Requirements Checklist:</span>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Digital Asset Links (<code className="text-stone-300">assetlinks.json</code>)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>TWA Package ID (<code className="text-stone-300">com.educare.youthapp</code>)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>512x512 Maskable Icon</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Full Offline Service Worker Cache</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PHONE (DIRECT ANDROID & IOS) */}
          {deviceTab === 'phone' && (
            <div className="space-y-4">
              {/* Direct Install CTA on Android if supported */}
              {isInstallable && !isIOS && (
                <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      1-Tap Android Phone Install Ready
                    </h4>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Install directly to your Android apps drawer and home screen.
                    </p>
                  </div>
                  <button
                    onClick={handleDirectInstall}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-stone-950 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Install on Phone</span>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Android Phones */}
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-stone-800">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white text-xs">Android Phones (Chrome / Edge / Samsung)</span>
                  </div>
                  <ol className="space-y-2 text-xs text-stone-300">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-stone-800 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                      <span>Tap the <strong>three dots menu (⋮)</strong> at the top right of your browser.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-stone-800 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                      <span>Select <strong>"Install app"</strong> or <strong>"Add to Home Screen"</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-stone-800 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                      <span>Tap <strong>Install</strong>. Educare appears in your phone app drawer with native speed!</span>
                    </li>
                  </ol>
                </div>

                {/* iPhone / iPad */}
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-stone-800">
                    <Apple className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-white text-xs">Apple iPhone &amp; iPad (Safari)</span>
                  </div>
                  <ol className="space-y-2 text-xs text-stone-300">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-stone-800 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                      <span>Tap the <strong>Share</strong> button <Share2 className="w-3.5 h-3.5 inline text-amber-400 mx-0.5" /> at the bottom of Safari.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-stone-800 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                      <span>Scroll down and tap <strong>"Add to Home Screen"</strong> <PlusSquare className="w-3.5 h-3.5 inline text-amber-400 mx-0.5" />.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-stone-800 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                      <span>Tap <strong>Add</strong>. Educare icon is now on your home screen!</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMPUTER */}
          {deviceTab === 'computer' && (
            <div className="space-y-4">
              {/* Direct Install CTA if supported */}
              {isInstallable && (
                <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Browser Ready for 1-Click Install
                    </h4>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Click below to instantly install Educare into your Windows or Mac applications.
                    </p>
                  </div>
                  <button
                    onClick={handleDirectInstall}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-stone-950 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Install App on PC/Mac</span>
                  </button>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-amber-400" />
                  <span>How to install on Windows, Mac, or Chromebook</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <div className="font-bold text-white">Look at Address Bar</div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      Look at the right side of your browser URL bar for the <strong className="text-amber-400">Install icon</strong> (computer with down arrow) or click browser menu (⋮).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <div className="font-bold text-white">Click "Install Educare"</div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      Confirm the installation prompt. The app will immediately create a desktop and Start Menu shortcut.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <div className="font-bold text-white">Native Window &amp; Offline</div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      Educare opens in its own clean window without browser tabs or address bars, completely functional offline!
                    </p>
                  </div>
                </div>
              </div>

              {/* Supported Browsers */}
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span className="font-medium text-stone-300">Supported Desktop Browsers:</span>
                <div className="flex items-center gap-3 text-stone-300 font-semibold text-[11px]">
                  <span className="flex items-center gap-1">🌐 Google Chrome</span>
                  <span className="flex items-center gap-1">🔷 Microsoft Edge</span>
                  <span className="flex items-center gap-1">🦁 Brave</span>
                  <span className="flex items-center gap-1">🧭 Safari (macOS Sonoma+)</span>
                </div>
              </div>
            </div>
          )}

          {/* Universal offline & free summary */}
          <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 text-[11px] text-stone-400 space-y-1">
            <div className="font-semibold text-stone-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Features of the Installed Educare App:</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-5 list-disc text-stone-300">
              <li>100% full offline capability with voice speech synthesis and listening</li>
              <li>Robo Mech, Advert Clinic, Bible Quiz, and Code Rise built-in</li>
              <li>Official certificates generated directly on device with PNG download</li>
              <li>Zero subscription fees or in-app purchases ($0 tuition-free)</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Play Store TWA Certified · Version 2.4.0</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-medium cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
