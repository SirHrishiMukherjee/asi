import React from 'react';

import Cityscape from './modules/cityscape.js';
import Clusters from './modules/clusters.js';
import ConsciousStream from './modules/conscious-stream.js';
import Cores from './modules/cores.js';
import Everlasting from './modules/everlasting.js';
import Helix from './modules/helix.js';
import InfiniteCity from './modules/infinite-city.js';
import KernelAtSpeed from './modules/kernel-at-speed.js';
import KernelGol from './modules/kernel-gol.js';
import Kernel from './modules/kernel.js';
import Live from './modules/live.js';
import MetaGoal from './modules/meta-goal.js';
import RogueProcess from './modules/rogue-process.js';
import Signal from './modules/signal.js';
import Speech from './modules/speech.js';
import States from './modules/states.js';
import Synapse from './modules/synapse.js';
import SuperThought from './modules/super-thought.js';
import SuperUser from './modules/super-user.js';
import Something from './modules/something.js';

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
