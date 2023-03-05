import React from "react";
import IconButton from "../buttons/IconButton";
import Input from "../inputs/Input";

function Chat({ className }) {
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    console.log("message sent");
  };
  return (
    <div className={`flex flex-col bg-stone-700 ${className}`}>
      <div className="flex flex-grow">chat</div>
      <form
        action=""
        className="flex w-full gap-1 p-2 h-14 bg-stone-900"
        onSubmit={handleSubmitMessage}
      >
        <Input className={"w-full"} placeholder={"Message"} />
        <IconButton
          icon="/icons/paper-plane-top-solid.svg"
          onClick={handleSubmitMessage}
        />
      </form>
    </div>
  );
}

export default Chat;
