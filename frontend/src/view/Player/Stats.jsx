import React from "react";
import StatsNumber from "../../components/StatsNumber";
import ProgressBar from "../../components/ProgressBar";

function Stats() {
  return (
    <div className="flex flex-col m-2">
      <div className="flex gap-4 mt-4">
        <div className="flex flex-col gap-1.5">
          <StatsNumber type="strength" value="95" modified />
          <StatsNumber type="vitality" value="82" />
          <StatsNumber type="intelligence" value="12" />
          <StatsNumber type="awareness" value="80" />
          <StatsNumber type="talent" value="35" />
          <StatsNumber type="speed" value="78" />
          <StatsNumber type="luck" value="64" modified />
        </div>
        <div className="flex flex-col w-full gap-2">
          <ProgressBar color="green" value={20} max={34} statsIcon="health" />
          <ProgressBar color="blue" value={4} max={5} statsIcon="focus" />
          <ProgressBar color="yellow" value={10} max={100} statsIcon="xp" />
          <h2 className="text-xl font-bold text-neutral-500">Buffs</h2>
          {/* buffs list go here */}
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <div className="flex flex-col gap-1.5">
          <StatsNumber type="armor" value="2" />
          <StatsNumber type="resistance" value="0" />
        </div>
        <div className="flex flex-col gap-1.5">
          <StatsNumber type="damagePhy" value="3" modified />
          <StatsNumber type="damageMag" value="1" />
        </div>
        <div className="flex flex-col gap-1.5">
          <StatsNumber type="movement" value="5" />
          <StatsNumber type="evasion" value="16" />
        </div>
      </div>
    </div>
  );
}

export default Stats;
