import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useMemo, type ReactNode } from "react";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const convexUrl = import.meta.env.VITE_CONVEX_URL;

export const integrationStatus = {
  clerkConfigured: Boolean(clerkPublishableKey),
  convexConfigured: Boolean(convexUrl),
  dataBoundaryConfigured: Boolean(clerkPublishableKey && convexUrl),
};

export function AppProviders({ children }: { children: ReactNode }) {
  if (!clerkPublishableKey) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <ConvexMaybeProvider>{children}</ConvexMaybeProvider>
    </ClerkProvider>
  );
}

function ConvexMaybeProvider({ children }: { children: ReactNode }) {
  const convex = useMemo(
    () => (convexUrl ? new ConvexReactClient(convexUrl) : null),
    [],
  );

  if (!convex) {
    return <>{children}</>;
  }

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
