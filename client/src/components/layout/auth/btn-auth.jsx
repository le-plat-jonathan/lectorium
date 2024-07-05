import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export const ButtonAuth = () => {
  // const { login, authError } = useContext(AuthContext);
  // console.log(authError);
  const authError = true;
  return !authError ? (
    <Link
      to={"/auth/login"}
      className={buttonVariants({ variant: "outline" })}
      onClick={login}
    >
      Login
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
          <Link to="/user">Account</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DropdownMenuItem
            className="hover:!bg-destructive"
            onClick={async () => deleteSession()}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
