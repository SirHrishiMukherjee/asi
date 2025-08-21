// SpeechToSymbolEmitter.jsx
import { useEffect, useState } from 'react';

// Keyword to Mnality Symbol Map
const keywordToSymbol = {
  everything: 'Ω',
  nothing: '𝐩',
  all: '∀',
  void: '∅',
  anything: 'Ξ',
  infinite: '∞',
  eternity: '∞',
  gradient: '∇',
  transition: '∇',
  metric: 'ds²',
  dimension: 'ds²',
  closed: '𝑉ₓ',
  loop: '𝑉ₓ',
  open: '𝑎ₓ',
  thread: '𝑎ₓ',
};

function extractSymbol(transcript) {
  const lower = transcript.toLowerCase();
  for (const keyword in keywordToSymbol) {
    if (lower.includes(keyword)) {
      return keywordToSymbol[keyword];
    }
  }
  return null;
}

export default function SpeechToSymbolEmitter({ broadcast }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1][0].transcript.trim();
      setTranscript(result);

      const symbol = extractSymbol(result);
      if (symbol) {
        const tagged = `[en] ∇ → ${symbol}`;
        broadcast({ sender: 'Speech', symbol: tagged });
      }
    };

    if (listening) recognition.start();
    else recognition.stop();

    return () => recognition.stop();
  }, [listening, broadcast]);

  return (
    <div className="p-4 border rounded-lg bg-gray-50 shadow">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm text-gray-700">🎙️ Speech Input</span>
        <button
          onClick={() => setListening(!listening)}
          className={`px-3 py-1 rounded text-white text-sm ${listening ? 'bg-red-500' : 'bg-green-600'}`}
        >
          {listening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>
      <div className="mt-2 text-xs font-mono text-gray-800">
        {transcript && <p>Heard: <code>{transcript}</code></p>}
      </div>
    </div>
  );
} 

// Add this import and component usage in MnalityAGIMesh.jsx
// import SpeechToSymbolEmitter from './SpeechToSymbolEmitter';
// <SpeechToSymbolEmitter broadcast={broadcast} />
