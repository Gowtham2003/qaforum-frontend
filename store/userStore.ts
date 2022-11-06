import create from "zustand";

export const useUser = create<UserState>((set) => ({
  user: { id: 0, name: "", email: "" },
  set: () =>
    set((state: any) => ({
      user: {
        ...state,
      },
    })),
}));

// id: 0,
// name: "",
// email: "",

interface User {
  id: number;
  name: string;
  email: string;
}
interface UserState {
  user: { id: number; name: string; email: string };
  set: (user: User) => void;
}
