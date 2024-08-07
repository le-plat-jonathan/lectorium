import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Separator } from "../ui/separator";
import { ButtonAuth } from "./auth/btn-auth";
import { List } from "./list";
import { SearchBar } from "./search-bar";
import { useCart } from '../../context/cartContext';
import { ScrollToTopButton } from '../ui/scrollToTopButton';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header id="top" className="sticky z-20 left-0 right-0 top-0 bg-background">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <SearchBar />
            <div className="hidden md:flex gap-8 items-center">
              <Link className="hover:text-primary" to="/">
                Accueil
              </Link>
              <Link className="hover:text-primary" to="/librairie">
                Librairie
              </Link>
            </div>
            <img className="w-32" src={Logo} alt="logo" />
            <div className="hidden md:flex gap-8 items-center">
              <a className="hover:text-primary" href="#who-we-are">
                A propos
              </a>
              <a className="hover:text-primary" href="#contact">
                Contact
              </a>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <List />
              <ButtonAuth />
              {/* <div className="relative">
                <Link to="/cart" className="hover:text-primary">
                  <i className="ri-shopping-cart-line"></i>
                  {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div> */}
            </div>
            <button className="md:hidden" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden flex flex-col gap-4 mt-4">
              <Link className="hover:text-primary" to="/">
                Accueil
              </Link>
              <Link className="hover:text-primary" to="/librairie">
                Librairie
              </Link>
              <a className="hover:text-primary" href="#who-we-are">
                A propos
              </a>
              <a className="hover:text-primary" href="#contact">
                Contact
              </a>
              <div className="flex items-center gap-4">
                <List />
                <ButtonAuth />
                {/* <div className="relative">
                  <Link to="/cart" className="hover:text-primary">
                    <i className="ri-shopping-cart-line"></i>
                    {cartItems.length > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                </div> */}
              </div>
            </div>
          )}
        </div>
        <Separator />
      </header>
      <ScrollToTopButton /> {/* Ajout du bouton ici */}
    </>
  );
};
