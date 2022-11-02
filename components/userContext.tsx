import React, { useState } from "react";

// Create a User context
const UserContext = React.createContext([{} || null, () => {}]);

export function UserProvider({ children }: any) {
  // we need to stick state in here
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
