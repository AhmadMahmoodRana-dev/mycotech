import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.0.105:4000/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: AsyncStorage.getItem("token") || null,
  loading: false,
  error: null,
  profileData: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/auth/login`, credentials);
      console.log("Login response:", res.data); // Debugging line
      const { user, token } = res.data;
      AsyncStorage.setItem("token", token);
      set({ user, token, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        loading: false,
      });
    }
  },

  logout: async () => {
    const token = await AsyncStorage.getItem("token"); // or get().token if you ensure state is synced
    try {
      const res = await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Logout response:", res.data);
      await AsyncStorage.removeItem("token");
      set({ user: null, token: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
  profile: async () =>{
    const token = await AsyncStorage.getItem("token"); 
    try {
      const res = await axios.get(`${API_URL}/auth/profile`,{
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log("Profile response:", res.data);
      set({ profileData: res.data });
    } catch (error) {
      console.error(error);
    }
  }
}));
