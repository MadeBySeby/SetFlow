import Svg, { Path } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import * as flubber from "flubber";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function MorphingButton({
  label,
  fromPath,
  toPath,
  selected,
  onPress,
}) {
  const progress = useSharedValue(selected ? 1 : 0);

  // Update progress when selected changes
  React.useEffect(() => {
    progress.value = withTiming(selected ? 1 : 0, { duration: 800 });
  }, [selected]);

  const interpolator = React.useMemo(
    () => flubber.interpolate(fromPath, toPath, { maxSegmentLength: 2 }),
    [fromPath, toPath]
  );

  const animatedProps = useAnimatedProps(() => {
    return {
      d: interpolator(progress.value),
    };
  });

  return (
    <Pressable
      onPress={onPress}
      style={{ alignItems: "center", marginBottom: 20 }}>
      <Svg width={120} height={120} viewBox="0 0 120 120">
        <AnimatedPath
          animatedProps={animatedProps}
          stroke="#22c55e"
          strokeWidth={2}
          fill="none"
        />
      </Svg>
      <Text style={{ color: "white", marginTop: 8 }}>{label}</Text>
    </Pressable>
  );
}
