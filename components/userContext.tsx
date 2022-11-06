import jwtDecode from "jwt-decode";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { createContext } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
}

const UserContext = createContext<
[User | null, Dispatch<SetStateAction<User | null>>]
>([null, () => {}]);

// Provider in your app

export function UserProvider({ children }: any) {
  const userState = useState<User | null>(null);

  useEffect(() => {
    const jwt = localStorage.getItem("user");
    if (jwt) {
      const user: User = jwtDecode(jwt);
      userState[1](user);
    }
  }, []);
  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
}

export default UserContext;
