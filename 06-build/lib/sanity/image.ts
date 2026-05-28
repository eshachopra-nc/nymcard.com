import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { dataset, projectId } from "./client";

// ── Sanity image URL builder ───────────────────────────────────────────────
//
// Turns a Sanity image reference into a URL we can pass to <Image>. Chain
// methods set width / fit / format on the served asset:
//
//   urlForImage(post.heroImage).width(1600).fit("max").auto("format").url()
//
// Inline images inside PortableText use the same helper through
// PortableTextBody's image-block component.

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
