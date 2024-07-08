import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";

const fetchBooks = async (query) => {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&maxResults=40&key=AIzaSyAmJjDBjk107C8ol7r8VDvgTsdkOitLJA0`
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

const Librairie = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchBooks("all");
                setBooks(data.items || []);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchData();
    }, []);

    const totalPages = Math.ceil(books.length / booksPerPage);
    const startIndex = (currentPage - 1) * booksPerPage;
    const currentBooks = books.slice(startIndex, startIndex + booksPerPage);

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
        <div className="p-16">
            <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {currentBooks.map((product) => (
                    <div
                        key={product.id}
                        className="relative overflow-hidden rounded-lg shadow-lg group m-4"
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
                                    className="absolute bottom-2 right-2"
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
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Librairie;
