import { create } from "zustand";
import axios from "axios";
import { devtools, persist } from "zustand/middleware";

const userStore = (set, get) => ({
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  loading: false,
  error: null,
  success: false,
  // Login Function
  login: async (email, password) => {
    try {
      set({ loading: true, error: null });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      set({ userInfo: data, loading: false });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Failed to login. Please try again.";
      set({ error: message, loading: false });
    }
  },

  // Register Function
  register: async (name, email, password, pic) => {
    try {
      set({ loading: true, error: null });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users",
        { name, email, password, pic },
        config
      );

      set({ userInfo: data, loading: false });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Failed to register. Please try again.";
      set({ error: message, loading: false });
    }
  },

  // Update Profile Function
  updateProfile: async (user) => {
    try {
      const { userInfo } = get();

      if (!userInfo || !userInfo.token) {
        throw new Error("User not authenticated.");
      }

      set({ loading: true, error: null ,success: false});

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post("/api/users/profile", user, config);
      
      set({ userInfo: data, loading: false, success: true });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Failed to update profile.";
      set({ error: message, loading: false });
    }
  },

  // Logout Function
  logout: () => {
    localStorage.removeItem("userInfo");
    set({ userInfo: null, error: null });
  },

  //reset handeler
  resetHandler: () => {
    set({ success: false , error: null ,loading: false});
  },
});

const useUserStore = create(
  devtools(persist(userStore, { name: "userStore" }))
);

export default useUserStore;
