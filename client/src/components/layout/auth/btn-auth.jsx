import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/context/auth.context";
import { getSession } from "@/utils/auth";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const deleteSession = () => {
  localStorage.removeItem('user_id');
};

export const ButtonAuth = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = getSession();
    setIsAuthenticated(!!token);
    const userId = localStorage.getItem('user_id');
    setIsAdmin(userId === '11');
  }, []);

  return !isAuthenticated ? (
    <Link
      to={"/auth/login"}
      className={buttonVariants({ variant: "outline" })}
      onClick={login}
    >
      Se connecter
    </Link>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>
          <i className="ri-user-line"></i>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to="/user">Mon compte</Link>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link to="/createBook">Créer un livre</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:!bg-destructive"
          onClick={() => {
            deleteSession();
            setIsAuthenticated(false);
            navigate("/");
          }}
        >
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
