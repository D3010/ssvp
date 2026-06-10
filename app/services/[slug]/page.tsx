import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, SERVICES } from "@/content/services";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.heroSub,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} · SSVP`,
      description: service.heroSub,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
