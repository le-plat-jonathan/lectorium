import { useQuery } from "@tanstack/react-query";
import ListProduct from "../product/list-product";

const fetchBooks = async (query) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&maxResults=6&key=AIzaSyAmJjDBjk107C8ol7r8VDvgTsdkOitLJA0`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
  
};

export const BestBook = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["books", "best"],
    queryFn: () => fetchBooks("best"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <section className="container">
      <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl text-center mb-8">
        Nos meilleures ventes
      </h2>
      {data && data.items && <ListProduct books={data.items} />}
    </section>
  );
};
