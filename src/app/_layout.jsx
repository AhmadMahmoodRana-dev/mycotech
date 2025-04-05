import { Stack, useRouter } from "expo-router";
import { StatusBar } from "react-native";
import { useEffect } from "react";

const RootNavigation = () => {
  const router = useRouter();
  const isLogin = true;

  useEffect(() => {
    router.replace(isLogin ? "/(main)" : "/(auth)");
  }, [isLogin]);

  return (
    <>
      <StatusBar hidden />
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "vertical",
          animationMatchesGesture: true,
        }}
      />
    </>
  );
};

export default RootNavigation;
