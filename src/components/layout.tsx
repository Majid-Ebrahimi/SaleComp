import Footer from "@/views/cards/footer/Footer";
import React, { ReactNode, FC } from "react";

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
