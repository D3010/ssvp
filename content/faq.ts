/** FAQ — rewritten for pharmacy (7), Part J. Answers always render in the DOM. */

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQS: FaqItem[] = [
  {
    q: "Does my staff learn new software?",
    a: "No. It's the same PrimeRx, the same workflow, the same muscle memory. The overlay does the keying — there's no new app to learn.",
  },
  {
    q: "Where does patient data go?",
    a: "Nowhere. Every model runs on your own hardware. Prescription images, insurance cards, IDs, and claims never leave the building for a third-party AI cloud.",
  },
  {
    q: "What about controlled substances?",
    a: "Never touched, by design. Controlled substances are excluded from every automated workflow — no auto-typing, no automated perpetual count, no automated ordering. 222/CSOS stays manual.",
  },
  {
    q: "What if PrimeRx updates?",
    a: "Versioned UIA maps per build, canary checks, and auto-halt to manual mean you're never worse off than before install. If a screen changes, the agent stops and hands the work back to your staff until the map is re-verified.",
  },
  {
    q: "Who signs off?",
    a: "Your pharmacist, on everything, always. The agent perceives, reasons, and stages the work; a licensed human is a hard gate on every action on the fill path.",
  },
  {
    q: "What does it cost?",
    a: "It's priced against the pain, not the labor — a low-four-figures monthly retainer per store against a modeled multiple in return. One avoided audit can cover the year.",
  },
  {
    q: "How do we start?",
    a: "A pilot application or a build call. Audit-distressed stores can enter straight through reactive audit response — the module that answers a notice you already have on your desk.",
  },
];
