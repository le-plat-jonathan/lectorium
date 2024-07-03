import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const fetchBooks = async (query) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&maxResults=6&key=AIzaSyAmJjDBjk107C8ol7r8VDvgTsdkOitLJA0`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.items;
};

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const Hero = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchRandomBooks = async () => {
      try {
        const books = await fetchBooks("javascript");
        setBooks(books.sort(() => 0.5 - Math.random()).slice(0, 4));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchRandomBooks();
  }, []);

  return (
    <section id="hero-anchor" className="">
      <div className="">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }} 
          className="w-full h-full overflow-hidden bgF3"
        >
          <CarouselContent>
            {books.map((book, index) => (
              <CarouselItem key={index}>
                <div className="grid grid-cols-2 gap-4 items-center max-md:grid-cols-1">
                  <div className="p-8 flex justify-center">
                    <img className="object-cover bookCover" src={book.volumeInfo.imageLinks?.thumbnail || 'http://localhost:5173/img1.png'} alt="hero" />
                  </div>
                  <div className="flex-column item-center">
                    <div className="flex-1">
                      <h1 className="text-4xl font-semibold p-4">
                        {book.volumeInfo.title}
                      </h1>
                      <p className="text-s text-justify p-4">
                        {truncateText(book.volumeInfo.description || 'No description available', 500)}
                      </p>
                      <p className="text-md p-4">
                        Genres: {book.volumeInfo.categories?.join(', ') || 'No genres available'}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
