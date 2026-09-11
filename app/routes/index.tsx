import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  Clock3,
  Database,
  Inbox,
  KeyRound,
  LayoutDashboard,
  Loader2,
  LogOut,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";

import { AuthenticatedDataBoundary } from "../shared/authenticated-data-boundary";
import { integrationStatus } from "../shared/app-providers";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

type DemoRecord = {
  id: number;
  title: string;
  owner: string;
  status: "New" | "Queued" | "Blocked";
  updatedAt: string;
};

type PreviewState = "populated" | "loading" | "empty" | "error";

const initialRecords: DemoRecord[] = [
  {
    id: 1,
    title: "Approve onboarding checklist",
    owner: "Maya",
    status: "New",
    updatedAt: "Today",
  },
  {
    id: 2,
    title: "Review pricing page copy",
    owner: "Ron",
    status: "Queued",
    updatedAt: "Yesterday",
  },
  {
    id: 3,
    title: "Unblock analytics handoff",
    owner: "Sam",
    status: "Blocked",
    updatedAt: "Sep 9",
  },
];

function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [records, setRecords] = useState(initialRecords);
  const [previewState, setPreviewState] = useState<PreviewState>("populated");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const visibleRecords = useMemo(() => {
    if (previewState === "empty") {
      return [];
    }

    return records;
  }, [previewState, records]);

  function handleCreateRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const owner = String(formData.get("owner") ?? "").trim();

    setSuccessMessage("");

    if (!title || !owner) {
      setFormError("Add a title and owner before creating a record.");
      return;
    }

    const nextRecord: DemoRecord = {
      id: Date.now(),
      title,
      owner,
      status: "New",
      updatedAt: "Just now",
    };

    setRecords((currentRecords) => [nextRecord, ...currentRecords]);
    setPreviewState("populated");
    setFormError("");
    setSuccessMessage(`Created "${title}".`);
    event.currentTarget.reset();
  }

  if (!isSignedIn) {
    return <LandingScreen onSignIn={() => setIsSignedIn(true)} />;
  }

  return (
    <main className="workspace-shell">
      <aside className="workspace-sidebar" aria-label="Workspace navigation">
        <a className="brand-lockup" href="#records" aria-label="Atlas Desk home">
          <span className="brand-mark" aria-hidden="true">
            <Sparkles />
          </span>
          <span>
            <strong>Atlas Desk</strong>
            <small>Demo workspace</small>
          </span>
        </a>

        <nav className="workspace-nav">
          <a href="#records" aria-current="page">
            <LayoutDashboard aria-hidden="true" />
            Records
          </a>
          <a href="#create-record">
            <Plus aria-hidden="true" />
            Create
          </a>
          <a href="#integration-seams">
            <ShieldCheck aria-hidden="true" />
            Seams
          </a>
        </nav>

        <Button
          className="sidebar-sign-out"
          type="button"
          variant="ghost"
          onClick={() => setIsSignedIn(false)}
        >
          <LogOut aria-hidden="true" />
          Sign out
        </Button>
      </aside>

      <section className="workspace-main" aria-labelledby="workspace-title">
        <header className="workspace-topbar">
          <div>
            <Badge variant="outline">Local demo mode</Badge>
            <h1 id="workspace-title">Requests</h1>
          </div>
          <div className="workspace-user" aria-label="Current user">
            <span>DR</span>
            <strong>Demo Ron</strong>
          </div>
        </header>

        <section className="workspace-overview" aria-label="Workspace summary">
          <MetricCard label="Open records" value={records.length.toString()} />
          <MetricCard
            label="Queued"
            value={records
              .filter((record) => record.status === "Queued")
              .length.toString()}
          />
          <MetricCard
            label="Blocked"
            value={records
              .filter((record) => record.status === "Blocked")
              .length.toString()}
          />
        </section>

        <div className="workspace-grid">
          <section className="records-panel" id="records" aria-labelledby="records-title">
            <div className="panel-header">
              <div>
                <h2 id="records-title">Record list</h2>
                <p>Track the first useful workflow before a backend exists.</p>
              </div>
              <div className="search-shell">
                <Search aria-hidden="true" />
                <span>Search ready</span>
              </div>
            </div>

            <PreviewControls
              previewState={previewState}
              onPreviewStateChange={setPreviewState}
            />

            <RecordList records={visibleRecords} previewState={previewState} />
          </section>

          <aside className="create-panel" id="create-record" aria-labelledby="create-title">
            <h2 id="create-title">Create record</h2>
            <p>
              This form uses local React state so the shell works without Clerk,
              Convex, or network setup.
            </p>

            <form className="record-form" onSubmit={handleCreateRecord}>
              <label htmlFor="record-title">Title</label>
              <input
                id="record-title"
                name="title"
                type="text"
                autoComplete="off"
                placeholder="Follow up with pilot customer"
              />

              <label htmlFor="record-owner">Owner</label>
              <input
                id="record-owner"
                name="owner"
                type="text"
                autoComplete="name"
                placeholder="Alex"
              />

              {formError ? (
                <p className="form-message form-error" role="alert">
                  {formError}
                </p>
              ) : null}
              {successMessage ? (
                <p className="form-message form-success" role="status">
                  {successMessage}
                </p>
              ) : null}

              <Button type="submit">
                <Plus aria-hidden="true" />
                Create record
              </Button>
            </form>
          </aside>
        </div>

        <section
          className="integration-section"
          id="integration-seams"
          aria-labelledby="integration-title"
        >
          <div>
            <Badge variant="outline">Next seams</Badge>
            <h2 id="integration-title">Ready to replace local demo state</h2>
            <p>
              The demo sign-in and record array are intentionally plain. Swap
              them for Clerk session state and Convex queries or mutations when
              real project credentials are available.
            </p>
          </div>
          <div className="seam-grid">
            <SeamCard
              icon={<KeyRound aria-hidden="true" />}
              label="Clerk"
              value={integrationStatus.clerkConfigured ? "Configured" : "Local demo"}
            />
            <SeamCard
              icon={<Database aria-hidden="true" />}
              label="Convex"
              value={integrationStatus.convexConfigured ? "Configured" : "Local demo"}
            />
          </div>
          <AuthenticatedDataBoundary />
        </section>
      </section>
    </main>
  );
}

function LandingScreen({ onSignIn }: { onSignIn: () => void }) {
  return (
    <main className="landing-shell">
      <section className="landing-copy" aria-labelledby="landing-title">
        <Badge>Atlas Desk</Badge>
        <h1 id="landing-title">A deliberately plain workspace demo.</h1>
        <p>
          Preview the authenticated product shell, records workflow, and local
          UI states without external credentials or backend setup.
        </p>
        <div className="hero-actions">
          <Button type="button" onClick={onSignIn}>
            <KeyRound aria-hidden="true" />
            Continue as demo user
          </Button>
          <Button asChild variant="secondary">
            <a href="#local-demo-notes">View setup notes</a>
          </Button>
        </div>
      </section>

      <section className="signin-card" aria-labelledby="signin-title">
        <div className="signin-card-header">
          <span className="brand-mark" aria-hidden="true">
            <Sparkles />
          </span>
          <Badge variant="outline">No credentials required</Badge>
        </div>
        <h2 id="signin-title">Local sign-in entry</h2>
        <p>
          This button mimics the authenticated entry point. Clerk remains behind
          the existing provider boundary for later wiring.
        </p>
        <Button type="button" onClick={onSignIn}>
          Open workspace
        </Button>
      </section>

      <section
        className="landing-notes"
        id="local-demo-notes"
        aria-label="Local demo notes"
      >
        <StatusItem
          icon={<CheckCircle2 aria-hidden="true" />}
          label="Runs locally"
          value="npm run dev"
        />
        <StatusItem
          icon={<ShieldCheck aria-hidden="true" />}
          label="Auth seam"
          value="Replace demo state with Clerk"
        />
        <StatusItem
          icon={<Database aria-hidden="true" />}
          label="Data seam"
          value="Replace local records with Convex"
        />
      </section>
    </main>
  );
}

function PreviewControls({
  previewState,
  onPreviewStateChange,
}: {
  previewState: PreviewState;
  onPreviewStateChange: (previewState: PreviewState) => void;
}) {
  const states: PreviewState[] = ["populated", "loading", "empty", "error"];

  return (
    <div className="preview-controls" aria-label="Preview record list state">
      {states.map((state) => (
        <button
          aria-pressed={previewState === state}
          key={state}
          onClick={() => onPreviewStateChange(state)}
          type="button"
        >
          {state}
        </button>
      ))}
    </div>
  );
}

function RecordList({
  records,
  previewState,
}: {
  records: DemoRecord[];
  previewState: PreviewState;
}) {
  if (previewState === "loading") {
    return (
      <div className="state-panel" role="status">
        <Loader2 aria-hidden="true" className="spin-icon" />
        <h3>Loading records</h3>
        <p>Preview of the future query loading state.</p>
      </div>
    );
  }

  if (previewState === "error") {
    return (
      <div className="state-panel state-error" role="alert">
        <AlertTriangle aria-hidden="true" />
        <h3>Records could not load</h3>
        <p>Preview of an error state for a failed authenticated query.</p>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="state-panel">
        <Inbox aria-hidden="true" />
        <h3>No records yet</h3>
        <p>Create the first request to preview the populated workspace.</p>
      </div>
    );
  }

  return (
    <ul className="record-list" aria-label="Workspace records">
      {records.map((record) => (
        <li key={record.id}>
          <span className="record-status" data-status={record.status}>
            {record.status === "Queued" ? (
              <Clock3 aria-hidden="true" />
            ) : (
              <CircleDot aria-hidden="true" />
            )}
          </span>
          <span className="record-copy">
            <strong>{record.title}</strong>
            <small>
              {record.owner} - {record.updatedAt}
            </small>
          </span>
          <Badge variant={record.status === "Blocked" ? "solid" : "outline"}>
            {record.status}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SeamCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="seam-card">
      <span className="status-icon">{icon}</span>
      <span>
        <span>{label}</span>
        <strong>{value}</strong>
      </span>
    </div>
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
