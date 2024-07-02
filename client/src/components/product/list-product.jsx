import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function ListProduct({ books }) {
  const products = books;
  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.volumeInfo.title}
          className="relative overflow-hidden rounded-lg shadow-lg group"
        >
          <Link href="#" className="absolute inset-0 z-10" prefetch="false">
            <span className="sr-only">View</span>
          </Link>
          <img
            src={product.volumeInfo.imageLinks.thumbnail}
            alt="Product 1"
            width={400}
            height={300}
            className="object-contain w-full h-60"
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-semibold">
              {product.volumeInfo.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {product.volumeInfo.categories[0]}
            </p>
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold">5,99€</h4>
              <Button type="submit" size="sm">Ajouter au panier</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
