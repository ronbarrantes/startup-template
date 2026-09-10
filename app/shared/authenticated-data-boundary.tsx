import {
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/tanstack-react-start";

import { integrationStatus } from "./app-providers";
import { Button } from "../ui/button";

export function AuthenticatedDataBoundary() {
  if (!integrationStatus.dataBoundaryConfigured) {
    return (
      <div className="boundary-panel" role="status">
        <h3>Integration not configured</h3>
        <p>
          Add `VITE_CLERK_PUBLISHABLE_KEY` and `VITE_CONVEX_URL` to `.env.local`
          to activate the authenticated data provider boundary.
        </p>
        <dl>
          <div>
            <dt>Clerk</dt>
            <dd>
              {integrationStatus.clerkConfigured ? "Configured" : "Missing"}
            </dd>
          </div>
          <div>
            <dt>Convex</dt>
            <dd>
              {integrationStatus.convexConfigured ? "Configured" : "Missing"}
            </dd>
          </div>
        </dl>
      </div>
    );
  }

  return <AuthenticatedDataPanel />;
}

function AuthenticatedDataPanel() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="boundary-panel" role="status">
        <h3>Checking session</h3>
        <p>Loading the authenticated workspace boundary.</p>
      </div>
    );
  }

  return (
    <div className="boundary-panel">
      {!isSignedIn ? (
        <>
          <h3>Sign in required</h3>
          <p>
            Authentication is configured. Sign in before loading workspace data.
          </p>
          <SignInButton mode="modal">
            <Button type="button">Sign in</Button>
          </SignInButton>
        </>
      ) : (
        <div className="boundary-header">
          <div>
            <h3>Ready for Convex records</h3>
            <p>
              Replace this placeholder with the first authenticated query or
              mutation for the product.
            </p>
          </div>
          <UserButton />
        </div>
      )}
    </div>
  );
}
