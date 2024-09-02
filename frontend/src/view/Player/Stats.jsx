import React from "react";
import StatsNumber from "../../components/StatsNumber";

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
        <div className="flex flex-col w-full">stats bar</div>
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
