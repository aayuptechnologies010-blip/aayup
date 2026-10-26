"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Show prompt bubble after 4 seconds
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = "917030839883";
  const defaultMessage = encodeURIComponent(
    "Hi AAYUP Technologies Team! I visited your website and would like to discuss a project / get a quick quote."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Pop-up greeting tooltip */}
      {showPrompt && !isOpen && (
        <div className="relative mb-3 bg-white text-[#0B1220] px-4 py-3 rounded-2xl shadow-2xl border border-slate-200/80 max-w-xs transition-all animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => setShowPrompt(false)}
            aria-label="Close message"
            className="absolute -top-2 -right-2 w-5 h-5 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center text-slate-600 text-xs shadow"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-start gap-3">
            <div className="relative flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                AY
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">
                AAYUP Tech Support
              </p>
              <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                Need an instant quote or project estimate? Chat directly on WhatsApp!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with AAYUP Technologies on WhatsApp"
        className="group relative flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white pl-4 pr-5 py-3.5 rounded-full shadow-[0_10px_25px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_15px_30px_-5px_rgba(16,185,129,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* Pulsing ring animation */}
        <span className="absolute -inset-1 bg-emerald-400 rounded-full blur-sm opacity-40 group-hover:opacity-75 animate-pulse -z-10" />

        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-current text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
        </div>

        <div className="text-left">
          <div className="text-[11px] font-medium leading-none text-emerald-100">
            Instant Reply
          </div>
          <div className="text-sm font-bold leading-tight">
            Chat on WhatsApp
          </div>
        </div>
      </a>
    </div>
  );
}
