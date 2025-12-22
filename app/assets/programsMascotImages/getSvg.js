import TenMinuteBodyweightBurn from "./10-MinuteBodyweightBurn.svg";
import TenMinuteBodyweightAbs from "./10-MinuteBodyweightAbs.svg";
import TenMinuteAbsCoreBlast from "./10-MinuteAbs&CoreBlast.svg";
import TenMinuteUpperBackBiceps from "./10-MinuteUpperBack&Biceps.svg";
import FifteenMinuteGluteQuadSculpt from "./15-MinuteGlute&QuadSculpt.svg";
import FifteenMinuteShoulderTricepBuilder from "./15-MinuteShoulder&TricepBuilder.svg";
import ThirtyMinuteIntenseAbWorkout from "./30-MinuteIntenseAbWorkout.svg";

export const getSvg = (workoutName) => {
  const key = workoutName.replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "");

  const svgMap = {
    "10MinuteBodyweightBurn": TenMinuteBodyweightBurn,
    "10MinuteBodyweightAbs": TenMinuteBodyweightAbs,
    "10MinuteAbsCoreBlast": TenMinuteAbsCoreBlast,
    "10MinuteUpperBackBiceps": TenMinuteUpperBackBiceps,
    "15MinuteGluteQuadSculpt": FifteenMinuteGluteQuadSculpt,
    "15MinuteShoulderTricepBuilder": FifteenMinuteShoulderTricepBuilder,
    "30MinuteIntenseAbWorkout": ThirtyMinuteIntenseAbWorkout,
  };

  return svgMap[key] || null;
};
