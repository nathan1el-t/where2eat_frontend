import { useContext, useDebugValue } from "react";
import AuthContext from "@/context/auth-context";

import type { AuthContextType } from "@/context/auth-context";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  useDebugValue(context.auth, auth => (auth?.user ? "Logged In" : "Logged Out"));

  return context;
};


