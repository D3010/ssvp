import type { Status } from "./site.config";

/** Build roadmap M0–15 — overlapping phases (Part B6). */

export interface Phase {
  id: string; // "P0"
  label: string;
  months: string; // "M0–2"
  monthStart: number; // for the overlap bar
  monthEnd: number;
  title: string;
  deliverables: string[];
  exit: string; // exit criteria stamp
  status: Status;
  why?: string; // "why this order" annotation
}

export const PHASES: Phase[] = [
  {
    id: "P0",
    label: "PHASE 0",
    months: "M0–2",
    monthStart: 0,
    monthEnd: 2,
    title: "Foundation",
    deliverables: [
      "Overlay shell",
      "PrimeRx UIA element map",
      "Append-only log",
      "Data spine",
      "Sandbox store",
    ],
    exit: "Read any screen as structured state; write + read-back proven.",
    status: "in-build",
  },
  {
    id: "P1",
    label: "PHASE 1",
    months: "M2–5",
    monthStart: 2,
    monthEnd: 5,
    title: "Auto-Typing",
    deliverables: [
      "Perception",
      "Sig parser",
      "NDC crosswalk",
      "All three intake channels",
      "Pilot in 1–3 stores",
    ],
    exit: "Pilot-set accuracy targets met; minutes-saved measured.",
    status: "in-build",
    why: "Typing builds daily trust — the technician feels the help on day one.",
  },
  {
    id: "P2",
    label: "PHASE 2",
    months: "M4–8",
    monthStart: 4,
    monthEnd: 8,
    title: "Inventory + ID Capture",
    deliverables: [
      "Scan-in / auto-deduct",
      "Drift monitor",
      "Card & ID capture",
    ],
    exit: "Perpetual inventory reconciling to invoices.",
    status: "in-build",
    why: "Inventory + ID lay the data spine every later module drinks from.",
  },
  {
    id: "P3",
    label: "PHASE 3",
    months: "M7–12",
    monthStart: 7,
    monthEnd: 12,
    title: "Audit Defense",
    deliverables: [
      "Proactive exposure queue GA",
      "payer_rule KB for major PBM manuals",
      "Reactive assembler on real notices",
    ],
    exit: "First defended audits; a dollars-protected ledger.",
    status: "pilot",
    why: "Third because invoice-shortage reconciliation needs months of history — audit-distressed stores can onboard straight into reactive mode.",
  },
  {
    id: "P4",
    label: "PHASE 4",
    months: "M11–15",
    monthStart: 11,
    monthEnd: 15,
    title: "Ordering + Hardening",
    deliverables: [
      "EDI 850 / portal transmit",
      "Multi-store tooling",
      "Security review",
    ],
    exit: "Full five-module suite GA.",
    status: "roadmap",
    why: "Ordering last because a PO is only as good as the count behind it.",
  },
];

/** Beyond the five — the horizon (Part B6). */
export const HORIZON: { title: string; body: string }[] = [
  { title: "Script Rescue", body: "Recover the scripts that walk out the door before they fill." },
  {
    title: "Reimbursement action layer",
    body: "Reverse-and-rebill, MAC appeals — the same engine, working the money after the fill.",
  },
  {
    title: "Adherence & refill revenue engine",
    body: "The next lane: keep patients on therapy and keep the refill revenue that follows.",
  },
];
