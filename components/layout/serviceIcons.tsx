/**
 * Icon + short-label maps for the Services mega-menu, keyed by service slug.
 * Icons are single-path stroke SVGs so they align cleanly in the menu tiles.
 */

export const SERVICE_ICONS: Record<string, string> = {
  "end-to-end-marketing": "M3 4h18l-7 8v6l-4 2v-8z",
  "ai-cold-calling":
    "M15.5 14.5 19 18a2 2 0 0 1-2 3 16 16 0 0 1-14-14 2 2 0 0 1 3-2l3.5 3.5-1.8 2.3a12 12 0 0 0 4.3 4.3z",
  "email-automation": "M4 5h16v14H4z M4 7l8 6 8-6",
  "pharmacy-workflow-automation": "M4 7h13M4 12h16M4 17h9 M19 5v4 M9 10v4 M14 15v4",
  "ai-voice-agents": "M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3z M5 11a7 7 0 0 0 14 0 M12 18v3",
  "patient-engagement-platform": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  "website-development": "M8 9l-3 3 3 3 M16 9l3 3-3 3 M13.5 6l-3 12",
  "crm-platform":
    "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
};

/** Tighter labels so every menu row fits one line and stays aligned. */
export const SERVICE_MENU_LABEL: Record<string, string> = {
  "pharmacy-workflow-automation": "Workflow Automation",
  "patient-engagement-platform": "Patient Engagement",
  "website-development": "Website Development",
};
