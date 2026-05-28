"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

// The Studio itself is a client component — it owns its own rendering tree
// and route handling. The wrapping page.tsx stays a server component so it
// can export metadata / viewport.

export function Studio() {
  return <NextStudio config={config} />;
}
