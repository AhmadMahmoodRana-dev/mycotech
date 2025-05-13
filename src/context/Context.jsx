import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const router = useRouter();
  const Logout = async (req, res) => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("tokenTime");
    await AsyncStorage.removeItem("empId");
    router.replace("/(auth)/");

    res.json({ message: "Logged out successfully" });
  };

  // ######################################################################################################################################

  const contextValue = {
    Logout,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
