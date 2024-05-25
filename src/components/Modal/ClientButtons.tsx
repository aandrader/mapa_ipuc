"use client";
import { FeedbackIcon, ShareIcon } from "../Icons";
import { publish } from "@/utils/events";

export const ClientButtons = () => {
  const divClass = "flex text-xs items-center gap-2 cursor-pointer hover:text-blue-600";
  const openDialog = () => {
    publish("openDialog");
  };
  return (
    <div className="grid grid-cols-2 p-4 border-t border-solid border-gray-300 text-blue-ipuc-500 ">
      <div onClick={() => navigator.share({ url: window.location.href })} className={divClass}>
        <ShareIcon />
        <span>Compartir congregación</span>
      </div>
      <div onClick={openDialog} className={divClass}>
        <FeedbackIcon />
        <span>Actualizar información</span>
      </div>
    </div>
  );
};
