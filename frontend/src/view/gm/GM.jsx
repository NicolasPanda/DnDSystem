import React, { useState } from "react";

import Chat from "../../components/chat/Chat";
import ModalContainer from "../../components/ModalContainer";

import { ReactComponent as CrystalCluster } from "../../assets/crystal-cluster.svg";
import { ReactComponent as SwordsSolid } from "../../assets/swords-solid.svg";
import { ReactComponent as OrcHead } from "../../assets/orc-head.svg";
import { ReactComponent as Stars } from "../../assets/stars-solid.svg";
import { ReactComponent as WandSparkles } from "../../assets/wand-sparkles-solid.svg";
import { ReactComponent as Minotaur } from "../../assets/minotaur.svg";
import { ReactComponent as Sack } from "../../assets/sack-solid.svg";
import { ReactComponent as Gem } from "../../assets/gem-solid.svg";

function GM() {
  const [ModalCrystalOpen, setModalCrystalOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col flex-grow">
          <div className="flex h-20 bg-stone-700">turn</div>
          <div className="flex flex-col flex-grow">entity</div>
          <div className="flex items-center w-full px-8 fill-orange-200 h-14 bg-stone-900">
            <button
              className="flex items-center justify-center w-24 h-full"
              onClick={() => setModalCrystalOpen(true)}
            >
              <CrystalCluster className="h-11 aspect-square" />
            </button>
            <button className="flex items-center justify-center w-24 h-full">
              <SwordsSolid className="h-8 aspect-square" />
            </button>
            <button className="flex items-center justify-center w-24 h-full">
              <OrcHead className="h-11 aspect-square" />
            </button>
            <button className="flex items-center justify-center w-24 h-full">
              <Stars className="h-8 aspect-square" />
            </button>
            <button className="flex items-center justify-center w-24 h-full">
              <WandSparkles className="h-8 aspect-square" />
            </button>
            <button className="flex items-center justify-center w-24 h-full">
              <Minotaur className="h-10 aspect-square" />
            </button>
            <button className="flex items-center justify-center w-24 h-full">
              <Sack className="h-8 aspect-square" />
            </button>
            <button className="flex items-center justify-center w-24 h-full ml-auto">
              <Gem className="h-8 aspect-square" />
            </button>
          </div>
        </div>
        <Chat className={"w-[450px]"} />
      </div>
      <ModalContainer
        open={ModalCrystalOpen}
        onClose={() => setModalCrystalOpen(false)}
      />
    </>
  );
}

export default GM;
