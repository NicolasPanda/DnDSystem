import React, { useState } from "react";

import { Tooltip } from "react-tippy";

import { ReactComponent as CrystalCluster } from "../../assets/crystal-cluster.svg";
import { ReactComponent as SwordsSolid } from "../../assets/swords-solid.svg";
import { ReactComponent as OrcHead } from "../../assets/orc-head.svg";
import { ReactComponent as Stars } from "../../assets/stars-solid.svg";
import { ReactComponent as WandSparkles } from "../../assets/wand-sparkles-solid.svg";
import { ReactComponent as Minotaur } from "../../assets/minotaur.svg";
import { ReactComponent as Sack } from "../../assets/sack-solid.svg";
import { ReactComponent as Gem } from "../../assets/gem-solid.svg";
import { ReactComponent as HandMagic } from "../../assets/hand-holding-magic-solid.svg";
import { ReactComponent as Dice } from "../../assets/dice-d20-solid.svg";
import ModalContainer from "../../components/ModalContainer";
import CreateEffectForm from "./createForm/CreateEffectForm";

function ToolBar() {
  const [modalCrystalOpen, setModalCrystalOpen] = useState(false);
  const [modalClassOpen, setModalClassOpen] = useState(false);
  const [modalRaceOpen, setModalRaceOpen] = useState(false);
  const [modalEffectOpen, setModalEffectOpen] = useState(false);
  const [modalSpellOpen, setModalSpellOpen] = useState(false);
  const [modalEnemyOpen, setModalEnemyOpen] = useState(false);
  const [modalItemOpen, setModalItemOpen] = useState(false);

  const handleOpenCrystalModal = () => {
    setModalCrystalOpen(true);
  };

  const handleCloseCrystalModal = () => {
    setModalCrystalOpen(false);
  };

  const handleOpenClassModal = () => {
    setModalClassOpen(true);
  };

  const handleCloseClassModal = () => {
    setModalClassOpen(false);
  };

  const handleOpenRaceModal = () => {
    setModalRaceOpen(true);
  };

  const handleCloseRaceModal = () => {
    setModalRaceOpen(false);
  };

  const handleOpenEffectModal = () => {
    setModalEffectOpen(true);
  };

  const handleCloseEffectModal = () => {
    setModalEffectOpen(false);
  };

  const handleOpenSpellModal = () => {
    setModalSpellOpen(true);
  };

  const handleCloseSpellModal = () => {
    setModalSpellOpen(false);
  };

  const handleOpenEnemyModal = () => {
    setModalEnemyOpen(true);
  };

  const handleCloseEnemyModal = () => {
    setModalEnemyOpen(false);
  };

  const handleOpenItemModal = () => {
    setModalItemOpen(true);
  };

  const handleCloseItemModal = () => {
    setModalItemOpen(false);
  };

  const handleOpenLootModal = () => {};

  const handleOpenGiveEffectModal = () => {};

  const handleOpenRequestCheckRollModal = () => {};

  const RenderButton = ({ icon, title, onClick }) => {
    return (
      <Tooltip title={title}>
        <button
          className="flex items-center justify-center w-16 h-full xl:w-24 hover:fill-sky-500"
          onClick={onClick}
        >
          {icon}
        </button>
      </Tooltip>
    );
  };

  const iconClass = "h-8 xl:h-10  aspect-square";

  return (
    <>
      <RenderButton
        icon={<CrystalCluster className={iconClass} />}
        title="Create Crystal"
        onClick={handleOpenCrystalModal}
      />
      <ModalContainer
        open={modalCrystalOpen}
        onClose={handleCloseCrystalModal}
        title="Crystal"
        className="w-2/3"
      >
        <p>form</p>
      </ModalContainer>

      <RenderButton
        icon={<SwordsSolid className={iconClass} />}
        title="Create Class"
        onClick={handleOpenClassModal}
      />
      <ModalContainer
        open={modalClassOpen}
        onClose={handleCloseClassModal}
        title="Class"
        className="w-2/3"
      >
        <p>form</p>
      </ModalContainer>

      <RenderButton
        icon={<OrcHead className={iconClass} />}
        title="Create Race"
        onClick={handleOpenRaceModal}
      />
      <ModalContainer
        open={modalRaceOpen}
        onClose={handleCloseRaceModal}
        title="Race"
        className="w-2/3"
      >
        <p>form</p>
      </ModalContainer>

      <RenderButton
        icon={<Stars className={iconClass} />}
        title="Create Effect"
        onClick={handleOpenEffectModal}
      />
      <ModalContainer
        open={modalEffectOpen}
        onClose={handleCloseEffectModal}
        title="Effect"
        className="w-5/6 h-5/6"
      >
        <CreateEffectForm />
      </ModalContainer>

      <RenderButton
        icon={<WandSparkles className={iconClass} />}
        title="Create Spell"
        onClick={handleOpenSpellModal}
      />
      <ModalContainer
        open={modalSpellOpen}
        onClose={handleCloseSpellModal}
        title="Spell"
        className="w-2/3"
      >
        <p>form</p>
      </ModalContainer>

      <RenderButton
        icon={<Minotaur className={iconClass} />}
        title="Create Enemy"
        onClick={handleOpenEnemyModal}
      />
      <ModalContainer
        open={modalEnemyOpen}
        onClose={handleCloseEnemyModal}
        title="Enemy"
        className="w-2/3"
      >
        <p>form</p>
      </ModalContainer>

      <RenderButton
        icon={<Sack className={iconClass} />}
        title="Create Item"
        onClick={handleOpenItemModal}
      />
      <ModalContainer
        open={modalItemOpen}
        onClose={handleCloseItemModal}
        title="Item"
        className="w-2/3"
      >
        <p>form</p>
      </ModalContainer>

      <span className="ml-auto" />

      <RenderButton
        icon={<Sack className={iconClass} />}
        title="Give Item"
        onClick={handleOpenLootModal}
      />

      <RenderButton
        icon={<HandMagic className={iconClass} />}
        title="Give Effect"
        onClick={handleOpenGiveEffectModal}
      />

      <RenderButton
        icon={<Dice className={iconClass} />}
        title="Request Check Roll"
        onClick={handleOpenRequestCheckRollModal}
      />
    </>
  );
}

export default ToolBar;
