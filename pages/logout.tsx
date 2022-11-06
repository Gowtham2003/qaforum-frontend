import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import UserContext from "../components/userContext";

function Logout() {
  const router = useRouter();
  const [, setUser] = useContext(UserContext);
  useEffect(() => {
    
    localStorage.removeItem(process.env.REACT_APP_JWT_KEY || "jwtPrivateKey");
    setUser(null);
    router.replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export default Logout;
