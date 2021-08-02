import React from "react";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import ProductSearch from "../components/Search/ProductSearch";

export default function HomePage() {
  return (
    <>
      <AppHeader />
      <main className="home-page">
        <ProductSearch/>
      </main>
      <AppFooter />
    </>
  );
}
