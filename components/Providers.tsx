"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
interface ProviderProps {
  children: ReactNode;
}

const Providers: FC<ProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Toaster reverseOrder={false} />
      {children}
    </SessionProvider>
  );
};

export default Providers;
