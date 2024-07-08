import React, { useState, useEffect } from 'react';
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

export const ItemList = ({ item, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isAside, setIsAside] = useState(item.aside);

  const handleReduceClick = async () => {
    const bookId = item.id;
    try {
      const response = await fetch(`http://localhost:8000/routes.php/update_cart/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: quantity - 1 }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setQuantity(quantity - 1);
      } else {
        console.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleIncreaseClick = async () => {
    const bookId = item.id;
    try {
      const response = await fetch(`http://localhost:8000/routes.php/update_cart/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: quantity + 1 }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setQuantity(quantity + 1);
      } else {
        console.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePutAside = async () => {
    const bookId = item.id;
    try {
      const response = await fetch(`http://localhost:8000/routes.php/put_aside/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aside: true }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setIsAside(true);
      } else {
        console.error('Failed to update aside status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRemoveAside = async () => {
    const bookId = item.id;
    try {
      const response = await fetch(`http://localhost:8000/routes.php/remove_aside/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aside: false }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setIsAside(false);
      } else {
        console.error('Failed to update aside status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRemoveItem = async () => {
    const bookId = item.id;
    try {
      const response = await fetch(`http://localhost:8000/routes.php/remove_from_cart/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        onRemove(bookId);
      } else {
        console.error('Failed to remove item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex-column items-center justify-between mb-3 p-4 border border-gray-400">

      <h3 className="text-lg font-semibold pb-4">{item.title}</h3>

      <div className='flex gap-4'>
        <img src={item.thumbnail} alt={item.title} className="w-40 h-40 mr-4" />
        <div className="flex-column items-center">
          <div className='flex-column m-2'>
            <Button size="icon" variant="outline" onClick={handleReduceClick}>
              <MinusIcon className="h-4 w-4" />
              <span className="sr-only">Réduire la quantité</span>
            </Button>
            <span className='m-2'>{quantity}</span>
            <Button size="icon" variant="outline" onClick={handleIncreaseClick}>
              <PlusIcon className="h-4 w-4" />
              <span className="sr-only">Augmenter la quantité</span>
            </Button>
          </div>
          <Button
            className="m-2"
            variant="outline"
            onClick={isAside ? handleRemoveAside : handlePutAside}
          >
            {isAside ? 'Remettre au panier' : 'Mettre de côté'}
          </Button>
          <Button className="m-2" size="icon" variant="outline" onClick={handleRemoveItem}>
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Supprimer l'article</span>
          </Button>
          <div className="flex-column items-center mt-2">
            <p className="text-sm text-muted-foreground">{item.categories.join(', ')}</p>
            <p className="text-lg font-semibold">{item.price}€</p>
          </div>
        </div>
      </div>
    </div>
  );
};
