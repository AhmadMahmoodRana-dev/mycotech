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


     const getDaysSinceComplaint = (filedDate) => {
      const complaintDate = new Date(filedDate);
      const currentDate = new Date();
    
      // Calculate time difference in milliseconds
      const timeDiff = currentDate - complaintDate;
    
      // Convert milliseconds to days
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
      return daysDiff;
    }

  // ######################################################################################################################################

  const contextValue = {
    Logout,
    getDaysSinceComplaint
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
