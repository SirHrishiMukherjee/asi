import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const principles = ['Allism', 'Nullism', 'Everything', 'Nothing', 'Anything', 'Something'];

const cityscapeStyles = {
  Allism: `
     ██████████████████████████████
    ██████   ████   ██████   █████
    ████ ███ ███ ███ ████ ███ ████
    █████████████████████████████
    █████████████████████████████`,
  Nullism: `
    ................................
    ...........     ...............
    .......           .............
    ...............................
    ............   ................`,
  Everything: `
     ███▓▓▓▒▒▒░░░▒▒▒▓▓▓███▒▒░░▓▓▓
    █▒░░▒▓▓█▓▓▒░░▒▒░░▓▓█▒▒░░▓▓███
    ███░░▓▓▓▒▒▒▓▓████▓▓▒▒▒▓▓█████
    ████████████████████████████`,
  Nothing: `





`,
  Anything: `
    █ | █ █ █ █ | █ █ █ | █ | █ █
    █ █ | █ █ █ █ █ | █ █ █ █ | █
    █ █ █ | █ █ | █ █ | █ █ █ | █`,
  Something: `
     ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    ▓▓▒▒░░░░▒▒▓▓▓▓▒▒░░░░▒▒▓▓▓▓▓▓
    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒`
};

function Cityscape({ principle }) {
  return (
    <div className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-4 rounded shadow-inner">
      <pre className="text-xs leading-3 font-mono text-center whitespace-pre-wrap">
        {cityscapeStyles[principle] || ''}
      </pre>
      <p className="text-center text-xs italic text-gray-400 mt-1">
        Cityscape Matrix: {principle}-Encoded Dream Construct
      </p>
    </div>
  );
}

function DreamNode({ level, path }) {
  const [children, setChildren] = useState([]);
  const [principle, setPrinciple] = useState(principles[(level - 1) % principles.length]);

  const addChild = () => {
    setChildren([...children, path + '.' + (children.length + 1)]);
  };

  return (
    <div className="ml-4 mt-4 border-l-2 pl-4 border-dashed border-gray-400">
      <Card className="bg-gradient-to-br from-blue-100 to-purple-100">
        <CardContent className="space-y-2">
          <h3 className="text-md font-bold">
            Level {level} — Path: {path}
          </h3>
          <p className="text-sm font-semibold text-indigo-700">
            Principle: {principle}
          </p>
          <p className="text-xs text-gray-600 italic">
            Traversing from Oedipal Island to Freudian Highlands...
          </p>
          <Cityscape principle={principle} />
          <Button size="sm" onClick={addChild}>
            Dive Deeper
          </Button>
        </CardContent>
      </Card>
      <div className="space-y-2">
        {children.map((childPath, idx) => (
          <DreamNode key={childPath} level={level + 1} path={childPath} />
        ))}
      </div>
    </div>
  );
}

export default function InceptionDreamTree() {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Inception: Oedipal to Freudian</h1>
      <p className="text-center text-gray-600">
        Begin the recursive descent — Tree after tree after tree to infinity.
      </p>
      <DreamNode level={1} path={"1"} />
    </div>
  );
}
