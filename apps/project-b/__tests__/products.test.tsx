// apps/project-b/pages/[market]/__tests__/products.test.tsx
import { render, screen } from "@testing-library/react";
import ProductsPage from "../pages/[market]/products";
import "@testing-library/jest-dom";

describe("Project B - [market]/products", () => {
  it("renders a list of products", () => {
    const mockProducts = [
      {
        id: 1,
        title: "Laptop",
        description: "A nice laptop",
        price: 1200,
        thumbnail: "/laptop.jpg",
      },
      {
        id: 2,
        title: "Phone",
        description: "A smartphone",
        price: 800,
        thumbnail: "/phone.jpg",
      },
    ];

    render(<ProductsPage market="en" products={mockProducts} />);

    // Header
    expect(screen.getByText("Home")).toBeInTheDocument();
    // Page heading
    expect(screen.getByText("Products – EN")).toBeInTheDocument();

    // Check the products
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("A nice laptop")).toBeInTheDocument();
    expect(screen.getByText("$1200")).toBeInTheDocument();

    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("A smartphone")).toBeInTheDocument();
    expect(screen.getByText("$800")).toBeInTheDocument();
  });
});
