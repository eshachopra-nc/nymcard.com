import "./index.css";
import { Composition } from "remotion";
import { loadFont as loadSans } from "@remotion/google-fonts/Geist";
import { loadFont as loadMono } from "@remotion/google-fonts/GeistMono";
import {
  LegacyToNCore,
  DURATION_IN_FRAMES,
  FPS,
  WIDTH,
  HEIGHT,
} from "./LegacyToNCore";

// Load Geist / Geist Mono (the brand type, tokens.typography.font-family) so the
// render matches the site. Remotion waits for fonts via the google-fonts helper.
// Only the weights the composition actually uses (400/600/700), latin subset —
// keeps the font network requests minimal during render.
loadSans("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});
loadMono("normal", {
  weights: ["400"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* §3 signature sequence — legacy fragmentation morphing into one nCore.
          The poster frame is rendered from this same composition at a chosen
          frame via `remotion still LegacyToNCore --frame=N` (a strong still from
          the resolved/mid state). */}
      <Composition
        id="LegacyToNCore"
        component={LegacyToNCore}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
