import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttons/Button";
import Stepper from "../../components/Stepper";
import CreateCharacterStepOne from "./CreateCharacterStepOne";

function CreateCharacter() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  const handleChange = (newData) => {
    setData({ ...data, ...newData });
  };
  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleCreateCharacter = () => {};

  let currentStepComponent;
  switch (step) {
    case 1:
      currentStepComponent = (
        <CreateCharacterStepOne onChange={handleChange} data={data} />
      );
      break;
    default:
      currentStepComponent = null;
      break;
  }

  return (
    <div className="flex flex-col items-center h-full min-h-screen gap-8 p-4">
      <Stepper currentStep={step} />
      {currentStepComponent}
      <div className="flex justify-between w-full mt-auto">
        {step === 1 ? (
          <Button
            name="Cancel"
            onClick={() => navigate("/role")}
            color={"danger"}
          />
        ) : (
          <Button
            name="Previous"
            onClick={handlePreviousStep}
            disable={step === 1}
          />
        )}

        {step === 5 ? (
          <Button name="Create" onClick={handleCreateCharacter} />
        ) : (
          <Button className={"ml-auto"} name="Next" onClick={handleNextStep} />
        )}
      </div>
    </div>
  );
}

export default CreateCharacter;
