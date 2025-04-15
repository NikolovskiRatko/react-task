// apps/project-a/pages/__tests__/products.test.tsx
import { render, screen } from "@testing-library/react";
import ProductsPage from "../pages/[market]/products";
import "@testing-library/jest-dom";

describe("[market]/products.tsx", () => {
  it("renders product cards", () => {
    const mockProducts = [
      { id: 1, title: "Product 1", description: "Desc 1", price: 100, thumbnail: "/img1.jpg" },
      { id: 2, title: "Product 2", description: "Desc 2", price: 200, thumbnail: "/img2.jpg" },
    ];

    render(<ProductsPage market="en" products={mockProducts} />);

    expect(screen.getByText("Products – EN")).toBeInTheDocument();
    // Check first product
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Desc 1")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    // Check second product
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
});
