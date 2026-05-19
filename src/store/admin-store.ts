import { create } from "zustand";

interface AdminState {
  isLoggedIn: boolean;
  isEditMode: boolean;
  editingSection: string | null;
  showLoginDialog: boolean;
  showEditDialog: boolean;
  login: () => void;
  logout: () => void;
  toggleEditMode: () => void;
  setEditingSection: (section: string | null) => void;
  setShowLoginDialog: (show: boolean) => void;
  setShowEditDialog: (show: boolean) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isLoggedIn: false,
  isEditMode: false,
  editingSection: null,
  showLoginDialog: false,
  showEditDialog: false,
  login: () => set({ isLoggedIn: true, showLoginDialog: false }),
  logout: () => set({ isLoggedIn: false, isEditMode: false, editingSection: null }),
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode, editingSection: null })),
  setEditingSection: (section) => set({ editingSection: section, showEditDialog: !!section }),
  setShowLoginDialog: (show) => set({ showLoginDialog: show }),
  setShowEditDialog: (show) => set({ showEditDialog: show, editingSection: show ? null : null }),
}));
