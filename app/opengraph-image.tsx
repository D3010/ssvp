import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "SSVP — Automation you can audit";

export default function Image() {
  return renderOgImage({
    title: "Automation you can audit.",
    metric: { value: "78% → 90%", label: "sender reputation, verified on Pulse" },
  });
}
