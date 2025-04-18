import { Stack, useRouter } from "expo-router";
import { StatusBar } from "react-native";
import { useEffect } from "react";

const RootNavigation = () => {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const storedToken = true;
      if (storedToken) {
        try {
          router.replace("/(main)");
        } catch (err) {
          router.replace("/(auth)");
        }
      } else {
        router.replace("/(auth)");
      }
    };
  
    checkLogin();
  }, []);
  

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
