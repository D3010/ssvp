import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getCaseStudy, CASE_STUDIES } from "@/content/caseStudies";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "SSVP case study";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return renderOgImage({
    eyebrow: `CASE STUDY · ${(study?.service ?? "").toUpperCase()}`,
    title: study?.title ?? "SSVP Case Study",
    metric: study ? study.heroMetrics[0] : undefined,
  });
}
