import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
