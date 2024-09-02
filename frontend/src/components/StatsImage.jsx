import React from "react";

/**
 * @typedef {'armor' | 'awareness' | 'damageMag' | 'damagePhy' | 'evasion' | 'focus' | 'health' | 'intelligence' | 'luck' | 'movement' | 'resistance' | 'speed' | 'strength' | 'talent' | 'vitality' | 'xp'} StatType
 */

/**
 * @param {{ type: StatType }} props
 */
function StatsImage({ type }) {
  switch (type) {
    case "armor":
      return <img src="/assets/icons/Armor_icon.png" alt="armor" />;
    case "awareness":
      return <img src="/assets/icons/Awareness_icon.png" alt="awareness" />;
    case "damageMag":
      return <img src="/assets/icons/DamageMag_icon.png" alt="damageMag" />;
    case "damagePhy":
      return <img src="/assets/icons/DamagePhy_icon.png" alt="damagePhy" />;
    case "evasion":
      return <img src="/assets/icons/Evasion_icon.png" alt="evasion" />;
    case "focus":
      return <img src="/assets/icons/Focus_icon.png" alt="focus" />;
    case "health":
      return <img src="/assets/icons/Health_icon.png" alt="health" />;
    case "intelligence":
      return (
        <img src="/assets/icons/Intelligence_icon.png" alt="intelligence" />
      );
    case "luck":
      return <img src="/assets/icons/Luck_icon.png" alt="luck" />;
    case "movement":
      return <img src="/assets/icons/Movement_icon.png" alt="movement" />;
    case "resistance":
      return <img src="/assets/icons/Resistance_icon.png" alt="resistance" />;
    case "speed":
      return <img src="/assets/icons/Speed_icon.png" alt="speed" />;
    case "strength":
      return <img src="/assets/icons/Strength_icon.png" alt="strength" />;
    case "talent":
      return <img src="/assets/icons/Talent_icon.png" alt="talent" />;
    case "vitality":
      return <img src="/assets/icons/Vitality_icon.png" alt="vitality" />;
    case "xp":
      return <img src="/assets/icons/XP_icon.png" alt="xp" />;
    default:
      break;
  }
}

export default StatsImage;
