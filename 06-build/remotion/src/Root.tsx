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
import {
  NCoreFoundation,
  DURATION_IN_FRAMES as NCF_DURATION,
  FPS as NCF_FPS,
  WIDTH as NCF_WIDTH,
  HEIGHT as NCF_HEIGHT,
} from "./NCoreFoundation";
import {
  ConsumerLendingCheckout,
  WIDTH as CL_WIDTH,
  HEIGHT as CL_HEIGHT,
} from "./ConsumerLendingCheckout";
import {
  RemittancesApp,
  WIDTH as RM_WIDTH,
  HEIGHT as RM_HEIGHT,
} from "./RemittancesApp";
import {
  ConceptToLiveBank,
  DURATION_IN_FRAMES as CTL_DURATION,
  WIDTH as CTL_WIDTH,
  HEIGHT as CTL_HEIGHT,
} from "./ConceptToLiveBank";

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

      {/* Digital Banking §3 — nCore full-stack compresses into a foundation, the
          bank's core seats on top, fuelled from beneath. Poster still rendered
          from a chosen frame via `remotion still NCoreFoundation --frame=N`. */}
      <Composition
        id="NCoreFoundation"
        component={NCoreFoundation}
        durationInFrames={NCF_DURATION}
        fps={NCF_FPS}
        width={NCF_WIDTH}
        height={NCF_HEIGHT}
      />

      {/* Digital Banking §4 · Consumer Lending — checkout → BNPL click → plan.
          Tightly-framed canvas so the panel reads large on the page. */}
      <Composition
        id="ConsumerLendingCheckout"
        component={ConsumerLendingCheckout}
        durationInFrames={NCF_DURATION}
        fps={NCF_FPS}
        width={CL_WIDTH}
        height={CL_HEIGHT}
      />

      {/* Digital Banking §4 · Remittances — multi-currency wallet → send money.
          Portrait canvas so the phone fills the frame. */}
      <Composition
        id="RemittancesApp"
        component={RemittancesApp}
        durationInFrames={NCF_DURATION}
        fps={NCF_FPS}
        width={RM_WIDTH}
        height={RM_HEIGHT}
      />

      {/* Digital Banking §7 · From board approval to live bank — 4-stage rail. */}
      <Composition
        id="ConceptToLiveBank"
        component={ConceptToLiveBank}
        durationInFrames={CTL_DURATION}
        fps={NCF_FPS}
        width={CTL_WIDTH}
        height={CTL_HEIGHT}
      />
    </>
  );
};
