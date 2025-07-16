import { useAuth } from "@/hooks/auth/useAuth";

export interface RouterContext {
  auth: ReturnType<typeof useAuth>;
}