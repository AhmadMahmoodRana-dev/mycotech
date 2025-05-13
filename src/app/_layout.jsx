import { useRouter, Slot } from "expo-router";
import { StatusBar } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContextProvider from "../context/Context";

const RootNavigation = () => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");
        const tokenTime = await AsyncStorage.getItem("tokenTime");
        const empId = await AsyncStorage.getItem("empId");
        console.log(authToken,tokenTime,empId)

        if (authToken && tokenTime && empId) {
          const currentTime = Date.now();
          const timeElapsed = currentTime - parseInt(tokenTime, 10);
          const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

          if (timeElapsed < oneHour) {
            // Token is valid, redirect to home
            router.replace("/(main)");
          } else {
            // Token expired, clear storage and redirect to auth
            await AsyncStorage.removeItem("authToken");
            await AsyncStorage.removeItem("empId");
            await AsyncStorage.removeItem("tokenTime");
            router.replace("/(auth)");
          }
        } else {
          // No token, redirect to auth
          router.replace("/(auth)");
        }
      } catch (error) {
        console.error("Error checking token:", error);
        router.replace("/(auth)");
      }
    };

    checkToken();
  }, []);

  return (
    <ContextProvider>
      <StatusBar hidden />
      <Slot />
    </ContextProvider>
  );
};

export default RootNavigation;