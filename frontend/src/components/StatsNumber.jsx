import React from "react";

import StatsImage from "./StatsImage";

/**
 * @typedef {'armor' | 'awareness' | 'damageMag' | 'damagePhy' | 'evasion' | 'focus' | 'health' | 'intelligence' | 'luck' | 'movement' | 'resistance' | 'speed' | 'strength' | 'talent' | 'vitality' | 'xp'} StatType
 */

/**
 * @param {{ type: StatType }} props
 */
function StatsNumber({ type, value = 0, modified = false }) {
  return (
    <div className="flex items-center w-24 p-1 border border-orange-200 rounded-xl bg-neutral-700">
      <StatsImage type={type} />
      <span
        className={`flex items-center font-bold justify-center w-full text-2xl ${
          modified ? "text-blue-500" : "text-neutral-200"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default StatsNumber;
