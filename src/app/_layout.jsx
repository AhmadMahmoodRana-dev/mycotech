import { useRouter, Slot } from "expo-router";
import { StatusBar } from "react-native";
import { useEffect } from "react";

const RootNavigation = () => {
  const router = useRouter();
  const isLogin = false;

  useEffect(() => {
    setTimeout(() => {
      router.replace(isLogin ? "/(main)" : "/(auth)");
    }, 0);
  }, []);

  return (
    <>
      <StatusBar hidden />
      <Slot />
    </>
  );
};

export default RootNavigation;
