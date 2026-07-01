import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "SSVP AI — The Invisible Technician for PrimeRx pharmacies";

export default function Image() {
  return renderOgImage({
    title: "The best technician you'll never see.",
    metric: { value: "$24,314", label: "avg audit recoupment a prepared pharmacy avoids" },
  });
}
