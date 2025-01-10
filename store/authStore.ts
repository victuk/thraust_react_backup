import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserDetails {
  fullName: string;
  email: string;
  role: string;
  profilePicture: string;
  jwt: string;
}

interface Store {
  isLoggedIn: boolean;
  userDetails: UserDetails;
  setUser: (val: UserDetails) => void;
  changeUserProfilePic: (val: string) => void;
  changeUserFullName: (firstName: string, surname: string) => void;
  removeUser: () => void;
}

export const authStore = create<Store>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userDetails: {
        fullName: "",
        email: "",
        role: "",
        profilePicture: "",
        jwt: "",
      },
      setUser: (userDetails: UserDetails) =>
        set((_state) => {
          return { userDetails, isLoggedIn: true };
        }),
        changeUserProfilePic: (newProfilePicture: string) =>
          set((state) => {
            return { userDetails: {...state.userDetails, profilePicture: newProfilePicture} };
          }),
          changeUserFullName: (firstName, surname) =>
            set((state) => {
              return { userDetails: {...state.userDetails, fullName: `${firstName} ${surname}`} };
            }),
      removeUser: () =>
        set((_state) => {
          return {
            isLoggedIn: false,
            userDetails: {
              fullName: "",
              email: "",
              role: "",
              profilePicture: "",
              jwt: "",
            },
          };
        }),
    }),
    {
      name: "authstore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
