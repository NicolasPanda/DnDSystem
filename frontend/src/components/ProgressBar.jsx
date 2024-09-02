import React from "react";
import colors from "tailwindcss/colors";
import StatsImage from "./StatsImage";

const green = colors.emerald[500];
const red = colors.red[500];
const yellow = colors.amber[600];
const blue = colors.blue[500];

/**
 * @typedef {'armor' | 'awareness' | 'damageMag' | 'damagePhy' | 'evasion' | 'focus' | 'health' | 'intelligence' | 'luck' | 'movement' | 'resistance' | 'speed' | 'strength' | 'talent' | 'vitality' | 'xp'} StatType
 */

/**
 * @param {{ percentage: number, color: 'green' | 'red' | 'yellow' | 'blue', statsIcon: StatType, showStatsIcon: boolean }} props
 */
function ProgressBar({
  value = 50,
  max = 100,
  color,
  statsIcon = "health",
  showStatsIcon = true,
}) {
  const getColor = (color) => {
    switch (color) {
      case "green":
        return green;
      case "red":
        return red;
      case "yellow":
        return yellow;
      case "blue":
        return blue;
      default:
        return green;
    }
  };

  return (
    <div className="flex items-center">
      {showStatsIcon && (
        <span className="z-10 -mr-3">
          <StatsImage type={statsIcon} />
        </span>
      )}
      <div className="relative flex items-center w-full h-6 bg-gray-200 rounded-md dark:bg-neutral-700">
        <div
          className="p-0.5 rounded-md h-full"
          style={{
            width: (value * 100) / max + "%",
            backgroundColor: getColor(color),
          }}
        ></div>
        <span className="absolute w-full font-bold text-center">
          {value}/{max}
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;
