"use client";

import { AppProvider } from "./AppContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AppProvider>{children}</AppProvider>;
};
