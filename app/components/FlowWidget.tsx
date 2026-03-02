import { Divider, HStack, Spacer, Text, VStack } from "@expo/ui/swift-ui";
import {
  background,
  bold,
  font,
  foregroundStyle,
  padding,
} from "@expo/ui/swift-ui/modifiers";
import { createWidget, WidgetBase } from "expo-widgets";

interface WorkoutData {
  type: string;
  exercises: string;
}

interface WidgetProps {
  workouts?: WorkoutData[];
}

const FlowWidget = (props: WidgetBase<WidgetProps>) => {
  "widget";
  const { workouts } = props;

  const workoutCount = workouts?.length || 0;

  return (
    <VStack
      alignment="leading"
      spacing={8}
      modifiers={[padding({ all: 16 }), background("#050A30")]}>
      <HStack>
        <Text
          modifiers={[foregroundStyle("#47b977"), font({ size: 18 }), bold()]}>
          SetFlow Fitness
        </Text>
        <Spacer />
        <Text modifiers={[foregroundStyle("white"), font({ size: 14 })]}>
          {workoutCount} {workoutCount === 1 ? "Workout" : "Workouts"}
        </Text>
      </HStack>

      <Divider
        modifiers={[foregroundStyle("#1e293b"), padding({ vertical: 8 })]}
      />

      {workoutCount > 0 ? (
        <VStack spacing={6} alignment="leading">
          <Text
            modifiers={[foregroundStyle("white"), font({ size: 12 }), bold()]}>
            Today&apos;s Activity
          </Text>
          {workouts?.slice(0, 3).map((w, index) => (
            <VStack key={`workout-${index}`} alignment="leading" spacing={2}>
              <Text
                modifiers={[
                  foregroundStyle("#47b977"),
                  font({ size: 10 }),
                  bold(),
                ]}>
                {w.type}
              </Text>
              <Text modifiers={[foregroundStyle("white"), font({ size: 10 })]}>
                {w.exercises}
              </Text>
            </VStack>
          ))}
          {workoutCount > 3 && (
            <Text modifiers={[foregroundStyle("gray"), font({ size: 10 })]}>
              + {workoutCount - 3} more
            </Text>
          )}
        </VStack>
      ) : (
        <VStack alignment="center" spacing={4}>
          <Spacer />
          <Text modifiers={[foregroundStyle("gray"), font({ size: 12 })]}>
            No workouts logged yet today.
          </Text>
          <Text
            modifiers={[
              foregroundStyle("#47b977"),
              font({ size: 10 }),
              bold(),
            ]}>
            Time to get moving!
          </Text>
          <Spacer />
        </VStack>
      )}
    </VStack>
  );
};

export default createWidget("FlowWidget", FlowWidget);
