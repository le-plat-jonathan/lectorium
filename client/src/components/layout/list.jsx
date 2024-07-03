import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ItemList } from "./item-list";

const fetchBooks = async (query) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&maxResults=1&key=AIzaSyAmJjDBjk107C8ol7r8VDvgTsdkOitLJA0`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const List = () => {
  const [cartItems, setCartItems] = useState([]);
  const [bookDetails, setBookDetails] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/routes.php/get_cart/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCartItems(data);

        const bookDetailsPromises = data.map(async (item) => {
          const bookData = await fetchBooks(item.book_id);
          const bookInfo = bookData.items[0].volumeInfo;
          return {
            ...item,
            title: bookInfo.title,
            categories: bookInfo.categories,
            thumbnail: bookInfo.imageLinks.thumbnail,
            price: 5.99
          };
        });

        const booksDetails = await Promise.all(bookDetailsPromises);
        setBookDetails(booksDetails);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = (bookId) => {
    setBookDetails((prevDetails) => prevDetails.filter(item => item.id !== bookId));
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center gap-1">
          <span>{cartItems.length}</span>
          <i className="ri-shopping-cart-line"></i>
        </div>
      </SheetTrigger>
      <SheetContent className="scrollable-content">
        <SheetHeader>
          <SheetTitle>Panier :</SheetTitle>
          <SheetDescription>
            {bookDetails.length > 0 && bookDetails.map((item) => (
              <ItemList key={item.book_id} item={item} onRemove={handleRemoveItem} />
            ))}
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button className="">Procéder au paiement</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
  