import { buttonVariants } from "@/components/ui/button";
import { AuthContext } from "@/context/auth.context";
import { useContext } from "react";
import { Link } from "react-router-dom";

export const ButtonAuth = () => {
  const { login, authError } = useContext(AuthContext);
  console.log(authError);
  return !authError ? (
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
