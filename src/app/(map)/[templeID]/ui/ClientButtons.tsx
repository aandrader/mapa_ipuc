"use client";

import { fetchTempleIdType } from "@/actions/queries";
import { FeedbackIcon, ShareIcon } from "@/components/Icons";
import Link from "next/link";

export const ClientButtons = ({ temple }: { temple: fetchTempleIdType }) => {
  const divClass = "flex text-xs items-center gap-2 cursor-pointer hover:text-blue-600";

  return (
    <div className="grid grid-cols-2 p-4 border-t border-solid border-gray-300 text-blue-ipuc-500 ">
      <div onClick={() => navigator.share({ url: window.location.href })} className={divClass}>
        <ShareIcon />
        <span>Compartir congregación</span>
      </div>
      <Link href={`/login?temple=${temple.id}&d=${temple.distrito}`} className={divClass}>
        <FeedbackIcon />
        <span>Actualizar información</span>
      </Link>
    </div>
  );
};
