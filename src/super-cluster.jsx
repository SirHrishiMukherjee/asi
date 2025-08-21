import React from 'react';

import Cityscape from './modules/cityscape.jsx';
import Clusters from './modules/clusters.jsx';
import ConsciousStream from './modules/conscious-stream.jsx';
import Cores from './modules/cores.jsx';
import Everlasting from './modules/everlasting.jsx';
import Helix from './modules/helix.jsx';
import InfiniteCity from './modules/infinite-city.jsx';
import KernelAtSpeed from './modules/kernel-at-speed.jsx';
import KernelGol from './modules/kernel-gol.jsx';
import Kernel from './modules/kernel.jsx';
import Live from './modules/live.jsx';
import MetaGoal from './modules/meta-goal.jsx';
import RogueProcess from './modules/rogue-process.jsx';
import Signal from './modules/signal.jsx';
import Speech from './modules/speech.jsx';
import States from './modules/states.jsx';
import Synapse from './modules/synapse.jsx';
import SuperThought from './modules/super-thought.jsx';
import SuperUser from './modules/super-user.jsx';
import Something from './modules/something.jsx';

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
