import { SCREEN_WIDTH } from "@/lib/window";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Text } from "./ui/text";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ActionItemProps {
  icon: LucideIcon;
  color: string;
  title: string;
  description: string;
}

export const ActionItem: React.FC<ActionItemProps> = ({
  icon: Icon,
  color,
  title,
  description,
}) => {
  const scale = useSharedValue(1);

  const actionItemAStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <AnimatedPressable
      entering={FadeIn.duration(100)}
      onPressIn={() => {
        scale.value = withTiming(0.95);
      }}
      onPressOut={() => {
        scale.value = withTiming(1);
      }}
      style={[actionItemAStyle]}
      className={`flex-row items-center bg-card rounded-2xl p-2 border h-28 z-50 w-[${
        SCREEN_WIDTH * 0.72
      }]`}
    >
      <View className="w-10 h-10 rounded-2xl items-center justify-center bg-primary">
        <Icon size={18} color="white" />
      </View>
      <View className="ml-2 gap-1 w-[90%]">
        <Text className="text-[18] font-bold">{title}</Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(44, 44, 46, 0.6)",
    borderRadius: 15,
    padding: 10,
    borderWidth: 1.3, // Adding border
    borderColor: "#3a3a3c", // Slightly lighter border color
    height: 112,
    zIndex: 999,
    width: SCREEN_WIDTH * 0.82,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  actionTextContainer: {
    marginLeft: 10,
    rowGap: 4,
    width: "90%",
  },
  actionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionDescription: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    color: "rgba(224, 224, 224, 0.9)",
  },
});
