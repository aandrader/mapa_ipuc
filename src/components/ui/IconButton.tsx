import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps {
  children?: ReactNode;
  href: string;
  className?: string;
}

export const IconButton = ({ children, href, className = "" }: IconButtonProps) => {
  return (
    <a
      className={twMerge(
        " bg-blue-ipuc-700 hover:bg-blue-ipuc-900 rounded-lg px-3.5 py-1.5 w-fit text-white flex gap-2 items-center justify-center",
        className
      )}
      target="_blank"
      rel="noreferrer"
      href={href}
    >
      {children}
    </a>
  );
};
