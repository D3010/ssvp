import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getService, SERVICES } from "@/content/services";
import { PILLARS } from "@/content/services";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "SSVP service";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  const pillar = service ? PILLARS.find((p) => p.id === service.pillar)?.label : undefined;
  return renderOgImage({
    eyebrow: (pillar ?? "SERVICES").toUpperCase(),
    title: service?.heroHeadline ?? "SSVP Services",
    metric: service
      ? { value: service.heroMetric.value, label: service.heroMetric.label }
      : undefined,
  });
}
