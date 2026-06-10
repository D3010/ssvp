import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "SSVP Pulse — The Proof Ledger";

export default function Image() {
  return renderOgImage({
    eyebrow: "PROOF LEDGER",
    title: "Every system we ship streams its results.",
    metric: { value: "$128,400", label: "recovered across SSVP systems" },
  });
}
