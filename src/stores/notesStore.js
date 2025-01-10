import { create } from "zustand";
import axios from "axios";
import { devtools, persist } from "zustand/middleware";
import useUserStore from "./userStore";
const notesStore = (set, get) => ({
    notes: [],
    loading: false,
    error: null,
    success: false,

    // List Notes
    listNotes: async () => {
        try {
            set({ loading: true, error: null });

            const { userInfo } = useUserStore.getState();
            if (!userInfo) throw new Error("User not authenticated.");

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get("/api/notes", config);
            set({ notes: data, loading: false });
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : error.message,
            });
        }
    },

    // Create Note
    createNote: async (title, content, category) => {
        try {
            set({ loading: true, error: null });

            const { userInfo } = useUserStore.getState();
            if (!userInfo) throw new Error("User not authenticated.");

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post("/api/notes/create", { title, content, category }, config);
            set({ success: true, notes: [...get().notes, data], loading: false });
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : error.message,
            });
        }
    },

    // Delete Note
    deleteNote: async (id) => {
        try {
            set({ loading: true, error: null });

            const { userInfo } = useUserStore.getState();
            if (!userInfo) throw new Error("User not authenticated.");

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.delete(`/api/notes/${id}`, config);
            set({
                success: true,
                notes: get().notes.filter((note) => note._id !== id),
                loading: false,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : error.message,
            });
        }
    },

    // Update Note
    updateNote: async (id, title, content, category) => {
        try {
            set({ loading: true, error: null });

            const { userInfo } = useUserStore.getState();
            if (!userInfo) throw new Error("User not authenticated.");

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(
                `/api/notes/${id}`,
                { title, content, category },
                config
            );

            set({
                success: true,
                notes: get().notes.map((note) =>
                    note._id === id ? { ...note, ...data } : note
                ),
                loading: false,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.response ? error.response.data.message : error.message,
            });
        }
    },

    // Reset success state
    resetSuccess: () => set({ success: false }),

    // Set user info
    setUserInfo: (userInfo) => set({ userInfo }),

});

const useNotesStore = create(
    devtools(persist(notesStore, { name: "notesStore" }))
);

export default useNotesStore;
