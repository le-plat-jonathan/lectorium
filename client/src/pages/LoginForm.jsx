import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/auth.context";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LoginFormPage = () => {
  const navigate = useNavigate();
  const { login, authError } = useContext(AuthContext);
  const mutation = useMutation({
    mutationFn: (user) =>
      client("http://localhost:8000/routes.php/login", {
        method: "POST",
        data: user,
      }),
    onSuccess: (data) => {
      login(data.user_id);
      if (!authError) {
        navigate("/user");
      }
    },
    onError: () => {
      alert("Mot de passe ou email incorect");
      navigate("/auth/login");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    mutation.mutate(newUser);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Connexion</CardTitle>
          <CardDescription>
            Entrez vos email et mot de passe pour vous connecter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder=""
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mot de passe</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Mot de passe oublié?
                </Link>
              </div>
              <Input name="password" id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
            <Button variant="outline" className="w-full">
              Se connecter avec Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Vous n'avez pas encore de compte?{" "}
            <Link to="/auth/signup" className="underline">
              Inscrivez-vous
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
