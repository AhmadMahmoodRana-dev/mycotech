import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createContext } from "react";
import axios from "axios"
import BaseUrl from "../common/BaseUrl";
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const router = useRouter();

  // LOGOUT
  
  const Logout = async (req, res) => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("tokenTime");
    await AsyncStorage.removeItem("empId");
    router.replace("/(auth)/");

    res.json({ message: "Logged out successfully" });
  };

  // DAYS SINCE COMPLAINT

     const getDaysSinceComplaint = (filedDate) => {
      const complaintDate = new Date(filedDate);
      const currentDate = new Date();
    
      // Calculate time difference in milliseconds
      const timeDiff = currentDate - complaintDate;
    
      // Convert milliseconds to days
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
      return daysDiff;
    }

  // GET STORE DETAILS  
  const [storeDetails,setStoreDetails] = useState([]);

  const getStoreDetails = async (emp_id) => {
    const {data} = await axios.get(`${BaseUrl}/storeName/${emp_id}`)
    setStoreDetails(data)
    console.log(data,"STORE DETAIL")
  }

  // ######################################################################################################################################

  const contextValue = {
    Logout,
    getDaysSinceComplaint,
    getStoreDetails
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
