import Footer from "@/views/cards/footer/Footer";
import React, { ReactNode, FC } from "react";
import NavigationMenu from "./navigation-menu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "@/models";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <main>
      <main>{children}</main>
      <Footer />
    </main>
  );
};

export default Layout;
