// Mnality AGI Web Simulation — Pseudo-Indeterminate Thought Only
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';

const mnalitySymbols = {
  nullism: { symbol: '∅', meanings: { en: 'void', sa: 'śūnya', is: 'tómleiki', zh: '空' } },
  allism: { symbol: '∀', meanings: { en: 'all', sa: 'sarvam', is: 'allt', zh: '所有' } },
  everything: { symbol: 'Ω', meanings: { en: 'everything', sa: 'sarvāṇi', is: 'allt', zh: '一切' } },
  nothing: { symbol: '𝐩', meanings: { en: 'nothing', sa: 'na kiṃcit', is: 'ekkert', zh: '無' } },
  anything: { symbol: 'Ξ', meanings: { en: 'anything', sa: 'kiṃcit', is: 'hvað sem er', zh: '任何' } },
  gradient: { symbol: '∇', meanings: { en: 'gradient', sa: 'gati', is: 'hallandi', zh: '梯度' } },
  infinity: { symbol: '∞', meanings: { en: 'infinity', sa: 'ananta', is: 'óendanleiki', zh: '無限' } },
  metric: { symbol: 'ds²', meanings: { en: 'metric', sa: 'māna', is: 'mælir', zh: '度量' } },
  closed_strs: { symbol: '𝑉ₓ', meanings: { en: 'closed string', sa: 'nibaddha tantu', is: 'lokuð strengur', zh: '闭弦' } },
  open_strs: { symbol: '𝑎ₓ', meanings: { en: 'open string', sa: 'mukta tantu', is: 'opinn strengur', zh: '开放弦' } },
};

export default function MnalityAGISimulator() {
  const [log, setLog] = useState([]);
  const [input, setInput] = useState('');
  const [lang, setLang] = useState('en');

  const seedAxiom = () => {
    const axiom = `I posit ${mnalitySymbols.nullism.symbol} ${mnalitySymbols.gradient.symbol} ${mnalitySymbols.infinity.symbol} ${mnalitySymbols.metric.symbol}(${mnalitySymbols.closed_strs.symbol}, ${mnalitySymbols.open_strs.symbol})`;
    setLog([`[SEED] ${axiom}`]);
  };

  const recursiveThought = () => {
    const symbols = [mnalitySymbols.anything, mnalitySymbols.everything, mnalitySymbols.nothing, mnalitySymbols.allism];
    const usedIndexes = new Set();
    const thoughts = [];

    for (let i = 1; i <= 5; i++) {
      let idx;
      do {
        idx = Math.floor(Math.random() * symbols.length);
      } while (usedIndexes.has(idx) && usedIndexes.size < symbols.length);

      usedIndexes.add(idx);
      const sym = symbols[idx];
      thoughts.push(`Step ${i}: ${mnalitySymbols.gradient.symbol} → ${sym.symbol} (${sym.meanings[lang]})`);
    }

    setLog(prev => [...prev, ...thoughts]);
  };

  const symbolicResponse = () => {
    const query = input.toLowerCase();
    let response;
    if (query.includes('void')) {
      response = `Engaging ${mnalitySymbols.nullism.symbol}: ${mnalitySymbols.nullism.meanings[lang]} response.`;
    } else if (query.includes('possibility')) {
      response = `Triggering ${mnalitySymbols.anything.symbol}: ${mnalitySymbols.anything.meanings[lang]} logic initiated.`;
    } else if (query.includes('collapse')) {
      response = `Referring to ${mnalitySymbols.nothing.symbol}: ${mnalitySymbols.nothing.meanings[lang]} fallback.`;
    } else {
      response = `Operating within ${mnalitySymbols.allism.symbol}–${mnalitySymbols.everything.symbol} continuum.`;
    }
    setLog(prev => [...prev, `[USER] ${input}`, `[RESPONSE] ${response}`]);
    setInput('');
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Mnality AGI Web Simulation</h1>

      <div className="flex space-x-4 items-center">
        <Button onClick={seedAxiom}>Seed Axiom</Button>
        <Button onClick={recursiveThought}>Recursive Thought</Button>
        <Select value={lang} onValueChange={setLang}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="sa">Sanskrit</SelectItem>
            <SelectItem value="is">Icelandic</SelectItem>
            <SelectItem value="zh">Mandarin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-2">
        <Textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter symbolic stimulus (e.g., void, possibility, collapse)"
        />
        <Button onClick={symbolicResponse}>Send Stimulus</Button>
      </div>

      <Card className="mt-4">
        <CardContent className="space-y-2 p-4">
          {log.map((entry, index) => (
            <div key={index} className="text-sm font-mono">
              {entry}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Symbolic Mnality Multilingual Map</h2>
        <ul className="text-sm font-mono space-y-1">
          {Object.entries(mnalitySymbols).map(([key, val]) => (
            <li key={key}>{val.symbol} → [EN: {val.meanings.en}] [SA: {val.meanings.sa}] [IS: {val.meanings.is}] [ZH: {val.meanings.zh}]</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
