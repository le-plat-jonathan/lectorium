import { Button } from "../ui/button";

export default function ListProduct({ books }) {
  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem('user_id');
    console.log(`Adding product ${productId} to cart for user ${userId}`);

    const data = {
      book_id: productId,
      user_id: userId,
      quantity: 1,
    };
    console.log(data);
    try {
      const response = await fetch('http://localhost:8000/routes.php/add_to_cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Produit ajouté au panier avec succès');
      } else {
        console.error('Erreur lors de l\'ajout au panier', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };
  
  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((product) => (
        <div
          key={product.id}
          className="relative overflow-hidden rounded-lg shadow-lg group"
        >
          <img
            src={product.volumeInfo.imageLinks?.thumbnail || 'default_thumbnail.jpg'}
            alt={product.volumeInfo.title}
            width={400}
            height={300}
            className="object-contain w-full h-60"
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-semibold">
              {product.volumeInfo.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {product.volumeInfo.categories && product.volumeInfo.categories[0]}
            </p>
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold">5,99€</h4>
              <Button 
                type="button" 
                size="sm"
                onClick={() => handleAddToCart(product.id)}
              >
                Ajouter au panier
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
