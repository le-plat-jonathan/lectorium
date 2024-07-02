import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/auth.context";
import { client } from "@/utils/http";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignupForm = () => {

  const navigate = useNavigate();
  const { login, authError } = useContext(AuthContext);
  
  const mutation = useMutation({
    mutationFn: (user) =>
      client("http://localhost:8000/routes.php/register", {
        method: "POST",
        data: user,
      }),
    onSuccess: (data) => {
      console.log(data);
      login(data.token);
      if (!authError) {
        navigate("/user");
      }
    },
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = {
      lastname: formData.get("lastname"),
      firstname: formData.get("firstname"),
      email: formData.get("email"),
      password: formData.get("password"),
      address: formData.get("address"),
      zip_code: formData.get("zip_code"),
      city: formData.get("city"),
    };
    mutation.mutate(newUser);
    console.log(newUser);
  };

  return (
    <div className="h-screen flex justify-center items-center text-center">
      <Card className="mx-auto max-w-m">
        <CardHeader>
          <CardTitle className="text-xl">Inscription</CardTitle>
          <CardDescription>
            Entrez vos informations pour créer votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex gap-8">
              <div className="leftForm flex-column">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input name="email" id="email" type="email" required />
                </div>
                <div className="grid gap-2 mt-5">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input name="password" id="password" type="password" required />
                </div>
                <div className="grid gap-2 mt-5">
                  <Label htmlFor="lastname">Nom</Label>
                  <Input name="lastname" id="lastname" type="text" required />
                </div>
                <div className="grid gap-2 mt-5">
                  <Label htmlFor="firstname">Prénom</Label>
                  <Input name="firstname" id="firstname" type="text" required />
                </div>
              </div>
              <div className="rightForm">
                <div className="grid gap-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input name="address" id="address" type="text" required />
                </div>
                <div className="grid gap-2 mt-5">
                  <Label htmlFor="zip_code">Code postal</Label>
                  <Input name="zip_code" id="zip_code" type="number" required />
                </div>
                <div className="grid gap-2 mt-5">
                  <Label htmlFor="city">Ville</Label>
                  <Input name="city" id="city" type="text" required />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full mt-3">
              Créer un compte
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Vous possédez déjà un compte?{" "}
            <Link to="/auth/login" className="underline">
              Connectez-vous
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
