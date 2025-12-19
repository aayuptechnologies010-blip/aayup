import React, { useEffect, useRef, useState } from "react";
import { MessageSquare, Mic, Send, X } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
};

const BOT_NAME = "Aayup Bot";

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

function useSpeechRecognition(onResult: (transcript: string) => void) {
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const w: any = window as any;
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: any) => {
      const t = e.results[0][0].transcript;
      onResult(t);
    };
    recognitionRef.current = rec;

    return () => {
      try {
        rec.onresult = null;
        rec.stop();
      } catch (e) {}
    };
  }, [onResult]);

  const start = () => recognitionRef.current && recognitionRef.current.start();
  const stop = () => recognitionRef.current && recognitionRef.current.stop();

  return { start, stop, available: !!recognitionRef.current };
}

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: "m1", sender: "bot", text: `Hi — I'm ${BOT_NAME}. How can I help you today?` },
  ]);
  const [botTyping, setBotTyping] = useState(false);

  const messagesRef = useRef<HTMLDivElement | null>(null);

  const onSpeechResult = (transcript: string) => {
    setListening(false);
    if (!transcript) return;
    sendMessage(transcript);
  };

  const { start, stop, available } = useSpeechRecognition(onSpeechResult);

  useEffect(() => {
    if (open === false) return;
    // scroll to bottom when new messages added
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // fake bot reply (replace with API call if needed)
    setBotTyping(true);
    setTimeout(() => {
      const reply = generateReply(trimmed);
      const botMsg: Message = { id: `b-${Date.now()}`, sender: "bot", text: reply };
      setMessages((m) => [...m, botMsg]);
      setBotTyping(false);
      // speak reply
      speak(reply);
    }, 900 + Math.min(trimmed.length * 20, 1200));
  };

  const generateReply = (userText: string) => {
    const lower = userText.toLowerCase();
    if (lower.includes("pricing")) return "Our pricing depends on the project scope — please share some details and we'll provide a quote.";
    if (lower.includes("services")) return "We offer web & mobile development, UI/UX design, API integration, AI training for students and more.";
    if (lower.includes("whatsapp") || lower.includes("chat")) return "You can message us directly on WhatsApp at +91 70308 39883 for quick responses.";
    if (lower.includes("hello") || lower.includes("hi")) return "Hello! How can I assist you today?";
    return "Thanks for your message — a team member will get back to you shortly. Meanwhile, could you share a few more details?";
  };

  const toggleListen = () => {
    if (!available) return;
    if (!listening) {
      try {
        start();
        setListening(true);
      } catch (e) {
        setListening(false);
      }
    } else {
      try {
        stop();
      } catch (e) {}
      setListening(false);
    }
  };

  return (
    <div>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        {open && (
          <div className="w-80 md:w-96 bg-background/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden transform transition-all duration-200 scale-100 opacity-100">
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold">Aayup Technologies</div>
                  <div className="text-xs opacity-90">Chat & voice support • Online</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    setListening(false);
                  }}
                  className="p-2 rounded hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div ref={messagesRef} className="max-h-64 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-white/5 to-transparent">
              {messages.map((m) => (
                <div key={m.id} className="flex items-end">
                  {m.sender === "bot" && (
                    <div className="mr-2 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center text-white">A</div>
                    </div>
                  )}
                  <div className={`max-w-[75%] ${m.sender === "user" ? "ml-auto text-right" : "mr-auto text-left"}`}>
                    <div className={`inline-block px-3 py-2 rounded-xl ${m.sender === "user" ? "bg-primary text-white" : "bg-card text-foreground"}`}>
                      {m.text}
                    </div>
                    <div className="text-xs text-foreground/60 mt-1">
                      {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  {m.sender === "user" && (
                    <div className="ml-2 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-primary">U</div>
                    </div>
                  )}
                </div>
              ))}

              {botTyping && (
                <div className="flex items-center">
                  <div className="mr-2">
                    <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center text-white">A</div>
                  </div>
                  <div className="inline-block px-3 py-2 rounded-xl bg-card text-foreground">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-foreground rounded-full animate-pulse inline-block" />
                      <span className="w-2 h-2 bg-foreground rounded-full animate-pulse inline-block delay-150" />
                      <span className="w-2 h-2 bg-foreground rounded-full animate-pulse inline-block delay-300" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-3 py-3 border-t border-border/50 flex items-center gap-2 bg-background/60">
              <button
                onClick={toggleListen}
                title={available ? (listening ? "Stop listening" : "Start talking") : "Voice not supported"}
                className={`p-2 rounded-md ${listening ? "bg-red-500 text-white" : "bg-muted/20"}`}
              >
                <Mic className="w-4 h-4" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage(input);
                }}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 rounded-md bg-white/5 border border-border/30"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className={`p-2 rounded-md text-white ${input.trim() ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted/20 cursor-not-allowed"}`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((s) => !s)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg flex items-center justify-center text-white"
          title="Chat with Aayup"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
