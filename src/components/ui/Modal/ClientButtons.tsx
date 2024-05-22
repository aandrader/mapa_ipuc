"use client";

import Link from "next/link";
import { FeedbackIcon, ShareIcon } from "../Icons";

export const ClientButtons = () => {
  const divClass = "flex text-xs items-center gap-2 cursor-pointer hover:text-blue-600";
  return (
    <div className="grid grid-cols-2 p-4 border-t border-solid border-gray-300 text-blue-ipuc-500 ">
      <div onClick={() => navigator.share({ url: window.location.href })} className={divClass}>
        <ShareIcon />
        <span>Compartir ubicación</span>
      </div>
      <Link href={"mailto:samuelandraderive@gmail.com"} className={divClass}>
        <FeedbackIcon />
        <span>Cambiar información</span>
      </Link>
    </div>
  );
};
