import React from 'react';

import Cityscape from './cityscape.js';
import Clusters from './clusters.js';
import ConsciousStream from './conscious-stream.js';
import Cores from './cores.js';
import Everlasting from './everlasting.js';
import Helix from './helix.js';
import InfiniteCity from './infinite-city.js';
import KernelAtSpeed from './kernel-at-speed.js';
import KernelGol from './kernel-gol.js';
import Kernel from './kernel.js';
import Live from './live.js';
import MetaGoal from './meta-goal.js';
import RogueProcess from './rogue-process.js';
import Signal from './signal.js';
import Speech from './speech.js';
import States from './states.js';
import Synapse from './synapse.js';
import SuperThought from './super-thought.js';
import SuperUser from './super-user.js';
import Something from './something.js';

const superCluster = {
  Cityscape,
  Clusters,
  ConsciousStream,
  Cores,
  Everlasting,
  Helix,
  InfiniteCity,
  KernelAtSpeed,
  KernelGol,
  Kernel,
  Live,
  MetaGoal,
  RogueProcess,
  Signal,
  Speech,
  States,
  Synapse,
  SuperThought,
  SuperUser,
  Something,
};

export default superCluster;

export function SuperClusterUI() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Super Cluster</h1>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(superCluster).map(([name, Component]) => (
          <div key={name} className="p-3 border rounded">
            <h2 className="text-lg font-semibold mb-2">{name}</h2>
            {Component ? <Component /> : <div>Component unavailable</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
