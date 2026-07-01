"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { SceneFrame } from "@/components/scene/SceneFrame";

/**
 * Client wrapper that owns dynamic(ssr:false) — ILLEGAL in a Server Component
 * in Next 16, legal here. The `poster` is passed down from the Server page so
 * it renders in the SSR HTML.
 */
const GlassScene = dynamic(() => import("./GlassScene"), { ssr: false });

export default function GlassSceneMount({ poster }: { poster: ReactNode }) {
  return (
    <SceneFrame poster={poster} className="h-full w-full">
      <GlassScene />
    </SceneFrame>
  );
}
