import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Separator } from "../ui/separator";
import { ButtonAuth } from "./auth/btn-auth";
import { List } from "./list";
import { SearchBar } from "./search-bar";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="sticky z-20 left-0 right-0 top-0 bg-background">
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
              </div>
            </div>
          )}
        </div>
        <Separator />
      </header>
    </>
  );
};
