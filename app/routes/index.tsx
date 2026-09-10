import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Database, KeyRound, Layers3 } from "lucide-react";
import type { ReactNode } from "react";

import { AuthenticatedDataBoundary } from "../shared/authenticated-data-boundary";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="page-shell">
      <section className="hero-section" aria-labelledby="page-title">
        <div className="hero-copy">
          <Badge>TanStack Start MVP</Badge>
          <h1 id="page-title">A plain foundation for small products.</h1>
          <p>
            TypeScript, a minimal shadcn-style UI layer, and guarded Clerk and
            Convex integration points are wired for local setup without secrets
            in the repository.
          </p>
          <div className="hero-actions">
            <Button asChild>
              <a href="#workspace">Open workspace</a>
            </Button>
            <Button asChild variant="secondary">
              <a href="https://tanstack.com/start" rel="noreferrer">
                TanStack Start
              </a>
            </Button>
          </div>
        </div>

        <div className="status-panel" aria-label="Foundation status">
          <StatusItem
            icon={<Layers3 aria-hidden="true" />}
            label="Application"
            value="TanStack Start"
          />
          <StatusItem
            icon={<CheckCircle2 aria-hidden="true" />}
            label="UI"
            value="Accessible primitives"
          />
          <StatusItem
            icon={<KeyRound aria-hidden="true" />}
            label="Auth"
            value="Clerk env-gated"
          />
          <StatusItem
            icon={<Database aria-hidden="true" />}
            label="Data"
            value="Convex env-gated"
          />
        </div>
      </section>

      <section className="workspace-section" id="workspace">
        <div>
          <Badge variant="outline">Workspace boundary</Badge>
          <h2>Authenticated data placeholder</h2>
          <p>
            This is the intended seam for product-specific records. It reports
            whether public Clerk and Convex configuration is present, then stays
            inert until real keys are supplied.
          </p>
        </div>
        <AuthenticatedDataBoundary />
      </section>
    </main>
  );
}

function StatusItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="status-item">
      <span className="status-icon">{icon}</span>
      <span>
        <span className="status-label">{label}</span>
        <strong>{value}</strong>
      </span>
    </div>
  );
}
