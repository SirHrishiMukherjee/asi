import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const principles = ['Allism', 'Nullism', 'Everything', 'Nothing', 'Anything', 'Something'];

function getRandomPrinciple(exclude = []) {
  const filtered = principles.filter(p => !exclude.includes(p));
  return filtered[Math.floor(Math.random() * filtered.length)] || principles[Math.floor(Math.random() * principles.length)];
}

const cityscapeStyles = {
  Allism: `||||||||||||||||||||||||||||||\n||||||  ||||   ||||||  ||||||\n||| ||| ||| ||| |||| ||| ||||\n||||||||||||||||||||||||||||`,
  Nullism: `................................\n...........     ................\n.......           ..............\n...............................\n............   ................`,
  Everything: `###@@@***+++***@@@###+++***@@@\n@@+++@@###@@+++***@@###+++@@###\n###+++***@@@###@@@***+++@@@####\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`,
  Nothing: `\n\n\n\n\n`,
  Anything: `| | | | | | | | | | | | | | |\n| | | | | | | | | | | | | | |\n| | | | | | | | | | | | | | |`,
  Something: `------------------------------\n----====----====----====-----\n------------------------------`
};

function Cityscape({ principle }) {
  return (
    <div className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-4 rounded shadow-inner transform scale-100 hover:scale-105 transition-transform duration-700">
      <pre className="text-xs leading-3 font-mono text-center whitespace-pre-wrap">
        {cityscapeStyles[principle] || ''}
      </pre>
      <p className="text-center text-xs italic text-gray-400 mt-1">
        Cityscape Matrix: {principle}-Encoded Dream Construct
      </p>
    </div>
  );
}

function DreamNode({ level, path, registerPrinciple, autoDive }) {
  const [children, setChildren] = useState([]);
  const [principle, setPrinciple] = useState(null);

  const addChild = () => {
    const newPrinciple = getRandomPrinciple();
    setPrinciple(newPrinciple);
    registerPrinciple(newPrinciple);
    const nextPath = path + '.' + (children.length + 1);
    setChildren([...children, nextPath]);
  };

  useEffect(() => {
    if (autoDive && !principle) {
      const timer = setTimeout(addChild, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoDive, principle]);

  return (
    <div className="ml-4 mt-4 border-l-2 pl-4 border-dashed border-gray-400">
      <Card className="bg-gradient-to-br from-blue-100 to-purple-100">
        <CardContent className="space-y-2">
          <h3 className="text-md font-bold">
            Level {level} — Path: {path}
          </h3>
          {principle && (
            <>
              <p className="text-sm font-semibold text-indigo-700">
                Principle: {principle}
              </p>
              <p className="text-xs text-gray-600 italic">
                Traversing from Oedipal Island to Freudian Highlands...
              </p>
              <Cityscape principle={principle} />
            </>
          )}
          {!autoDive && (
            <Button size="sm" onClick={addChild}>
              Dive Deeper
            </Button>
          )}
        </CardContent>
      </Card>
      <div className="space-y-2">
        {children.map((childPath, idx) => (
          <DreamNode
            key={childPath}
            level={level + 1}
            path={childPath}
            registerPrinciple={registerPrinciple}
            autoDive={autoDive}
          />
        ))}
      </div>
    </div>
  );
}

function PermutiveCityscape({ principles }) {
  const cityBlocks = principles.map(p => cityscapeStyles[p]?.split('\n'));
  const maxLines = Math.max(...cityBlocks.map(block => block.length));

  const lines = Array.from({ length: maxLines }, (_, i) =>
    cityBlocks.map(block => block[i] || '').join(' ')
  );

  return (
    <div className="mt-10 p-4 border rounded bg-black text-white shadow-xl">
      <h2 className="text-lg font-bold text-center mb-2 text-cyan-400">Permutive Cityscape Construct</h2>
      <div className="bg-gray-900 p-3 rounded shadow-inner">
        <pre className="text-[10px] leading-[1.1rem] font-mono whitespace-pre-wrap text-center">
          {lines.join('\n')}
        </pre>
        <p className="text-center text-xs italic text-gray-300 mt-1">
          Expanding Mnality Skyline Through Recursive Descent
        </p>
      </div>
    </div>
  );
}

export default function InceptionDreamTree() {
  const [seenPrinciples, setSeenPrinciples] = useState([]);

  const registerPrinciple = (principle) => {
    setSeenPrinciples((prev) => [...prev, principle]);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Inception: Oedipal to Freudian</h1>
      <p className="text-center text-gray-600">
        Begin the recursive descent — Tree after tree after tree to infinity.
      </p>
      <DreamNode level={1} path={"1"} registerPrinciple={registerPrinciple} autoDive={true} />
      <PermutiveCityscape principles={seenPrinciples} />
    </div>
  );
}
