import Svg, { Path } from "react-native-svg";

export default function MuscleFigure({ highlights = [] }) {
  return (
    <Svg viewBox="0 0 200 400" width={120} height={240}>
      {/* torso/abs path id="abs" */}
      <Path
        d="M80 100 C90 140 110 140 120 100..." // example
        fill={highlights.includes("abs") ? "#47B977" : "rgba(255,255,255,0.08)"}
      />
      {/* left quad */}
      <Path
        d="M80 200 L90 260..."
        fill={
          highlights.includes("quads") ? "#F59E0B" : "rgba(255,255,255,0.04)"
        }
      />
      {/* ...other body parts */}
    </Svg>
  );
}
