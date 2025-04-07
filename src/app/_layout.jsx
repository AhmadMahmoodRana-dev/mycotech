import { Stack, useRouter } from "expo-router";
import { StatusBar } from "react-native";
import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

const RootNavigation = () => {
  const router = useRouter();
  const { token } = useAuthStore();
  console.log(token);

  useEffect(() => {
    const checkLogin = async () => {
      const storedToken = await token; // if token is Promise (because of AsyncStorage)
      router.replace(storedToken ? "/(main)" : "/(auth)");
    };

    checkLogin();
  }, [token]);

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
