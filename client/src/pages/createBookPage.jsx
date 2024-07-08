import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/auth.context";
import { client } from "@/utils/http";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const CreateBookPage = () => {
  const navigate = useNavigate();
  const { authError } = useContext(AuthContext);
  const mutation = useMutation({
    mutationFn: (book) =>
      client("http://localhost:8000/routes.php/create_book", {
        method: "POST",
        data: book,
      }),
    onSuccess: () => {
      if (!authError) {
        navigate("/");
        window.location.reload();
      }
    },
    onError: () => {
      alert("Erreur lors de la création du livre");
      navigate("/createBook");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newBook = {
      title: formData.get("title"),
      author: formData.get("author"),
      description: formData.get("description"),
      book_cover: formData.get("book_cover"),
      genres: formData.getAll("genres"),
    };
    mutation.mutate(newBook);
  };

  return (
    <div className="h-90% flex justify-center items-center p-8">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Créer un livre</CardTitle>
          <CardDescription>
            Entrez les détails du livre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Titre</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Auteur</Label>
              <Input id="author" name="author" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="book_cover">Couverture du livre</Label>
              <Input id="book_cover" name="book_cover" type="file" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="genres">Genres</Label>
              <Input id="genres" name="genres" required />
            </div>
            <Button type="submit" className="w-full">
              Créer
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
