import React from "react";

function Stepper({ stepNumber = 5, currentStep = 1 }) {
  const steps = [];

  for (let i = 0; i < stepNumber - 1; i++) {
    steps.push(
      <React.Fragment key={"stepper-" + i}>
        <div
          className={`w-full h-2 ${
            currentStep - 1 >= i + 1 ? "bg-[#3B82F6]" : "bg-stone-600"
          }`}
        />
        <span
          className={`flex items-center justify-center h-10 rounded-full aspect-square ${
            currentStep - 1 >= i + 1 ? "bg-[#3B82F6]" : "bg-stone-600"
          }`}
        >
          {i + 2}
        </span>
      </React.Fragment>
    );
  }

  return (
    <div className="flex items-center w-full text-xl font-medium">
      <span className="flex items-center justify-center h-10 rounded-full aspect-square bg-[#3B82F6]">
        1
      </span>
      {steps}
    </div>
  );
}

export default Stepper;
