"use client";

import { signOut } from "next-auth/react";

export const Header = () => {
  return (
    <div>
      Header
      <button onClick={() => signOut()}>Cerrar sesión</button>
    </div>
  );
};
