"use client";

import { useState, useEffect } from "react";
import { X, PhoneCall } from "lucide-react";

export default function FloatingContactButtons() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Show prompt tooltip after 4 seconds
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = "918382984709";
  const defaultMessage = encodeURIComponent(
    "Hi AAYUP Technologies Team! I visited your website and would like to discuss a project / get a quick quote."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
  const callUrl = `tel:+${phoneNumber}`;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start pointer-events-auto gap-3">
      {/* Pop-up greeting tooltip on the left */}
      {showPrompt && (
        <div className="relative bg-white text-[#0B1220] px-4 py-3 rounded-2xl shadow-2xl border border-slate-200/90 max-w-xs transition-all animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => setShowPrompt(false)}
            aria-label="Close message"
            className="absolute -top-2 -right-2 w-5 h-5 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center text-slate-600 text-xs shadow"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-start gap-2.5">
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
                Need an instant quote? WhatsApp or call our engineering team directly!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons Group with circular buttons & clean gap */}
      <div className="flex flex-col items-center gap-3">
        {/* WhatsApp Circular Floating Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with AAYUP Technologies on WhatsApp"
          title="Chat on WhatsApp"
          className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(37,211,102,0.6)] hover:shadow-[0_12px_25px_-4px_rgba(37,211,102,0.75)] transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {/* Pulsing glow background */}
          <span className="absolute -inset-1 bg-[#25D366] rounded-full blur-sm opacity-40 group-hover:opacity-75 animate-pulse -z-10" />

          {/* Official WhatsApp Vector Icon */}
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              fill="currentColor"
              className="text-white"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
          </div>
        </a>

        {/* Direct Call Circular Floating Button */}
        <a
          href={callUrl}
          aria-label="Call AAYUP Technologies directly"
          title="Call AAYUP Technologies"
          className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#1769AA] hover:bg-[#0D4F85] text-white flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(23,105,170,0.6)] hover:shadow-[0_12px_25px_-4px_rgba(23,105,170,0.75)] transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {/* Pulsing ring on Call */}
          <span className="absolute -inset-1 bg-[#1769AA] rounded-full blur-sm opacity-35 group-hover:opacity-65 animate-pulse -z-10" />

          {/* Real Phone Call Vector Icon */}
          <div className="w-6 h-6 flex items-center justify-center">
            <PhoneCall className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
          </div>
        </a>
      </div>
    </div>
  );
}
