import { buttonVariants } from "@/components/ui/button";
import { AuthContext } from "@/context/auth.context";
import { getSession } from "@/utils/auth";
import { useContext } from "react";
import { Link } from "react-router-dom";

export const ButtonAuth = () => {
  const { login} = useContext(AuthContext);
  const isConnected = getSession();
  return !isConnected ? (
    <Link
      to={"/auth/login"}
      className={buttonVariants({ variant: "outline" })}
      onClick={login}
    >
      Login
    </Link>
  ) : (
    <i className="ri-user-line"></i>
  );
};
