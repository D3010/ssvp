# Rendered art drop-in folder

Put rendered 3D illustrations or photos here, then render them with the
`ArtImage` component (`components/ui/ArtImage.tsx`). `next/image` will auto-serve
AVIF/WebP at device-correct sizes and lazy-load anything below the fold, so the
fast initial load we engineered stays intact.

## Usage

```tsx
import { ArtImage } from "@/components/ui/ArtImage";

<ArtImage
  src="/art/hero-device.avif"
  alt="SSVP Pulse dashboard running on a tablet"
  width={1280}
  height={960}
  priority           // only for above-the-fold art (e.g. hero)
/>
```

For decorative-only art that conveys no info, use `alt=""`.

## File specs

- **Format:** AVIF or WebP for photographic / shaded renders. PNG (or WebP with
  alpha) for floating objects that need a transparent background.
- **Color:** match the brand — indigo `#4f46e5` → violet `#7c3aed` → fuchsia
  `#a855f7`, on white. Soft, premium studio lighting.
- **Resolution:** export at ~2× the largest display size (below) for retina.

## Recommended shot list (pharmacy-AI themed)

| filename                | display size | transparent? | subject |
|-------------------------|--------------|--------------|---------|
| `hero-device.avif`      | 640×480      | no           | The Pulse dashboard on a tablet/laptop, 3/4 view |
| `capsule-3d.png`        | 220×120      | **yes**      | Glossy brand-gradient capsule (hero accent) |
| `pill-bottle-3d.png`    | 160×210      | **yes**      | Amber Rx bottle, brand-tinted label |
| `blister-3d.png`        | 260×190      | **yes**      | Foil blister pack of pills |
| `pharmacy-scene.avif`   | 1200×750     | no           | Calm modern pharmacy counter / robotics |
| `voice-agent-3d.avif`   | 560×560      | no           | Abstract 3D soundwave / phone-ring motif |

## Where to source renders

- Render your own in **Spline** (spline.design) or **Blender**, export PNG/AVIF.
- Commission or buy from a 3D asset marketplace.
- Once files are here, tell me and I'll wire each into the right section
  (hero, Solutions, Pulse, Enterprise) with correct sizing and lazy-loading.
