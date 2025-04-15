// apps/project-b/pages/[market]/product/__tests__/product-id.test.tsx
import { render, screen } from "@testing-library/react";
import ProductDetailPage from "../pages/[market]/product/[id]";
import "@testing-library/jest-dom";

describe("Project B - [market]/product/[id]", () => {
  it("renders product detail if product is provided", () => {
    // Example product object
    const mockProduct = {
      id: 101,
      title: "Fancy Shoes",
      description: "Comfortable shoes for all occasions",
      price: 99,
      brand: "TestBrand",
      category: "Footwear",
      thumbnail: "/shoes.jpg",
    };

    render(
      <ProductDetailPage
        market="en"
        product={mockProduct}
      />
    );

    // Header is shown
    expect(screen.getByText("Home")).toBeInTheDocument();
    // Page heading
    expect(screen.getByText("Product Detail - EN")).toBeInTheDocument();
    // Product info
    expect(screen.getByText("Fancy Shoes")).toBeInTheDocument();
    expect(screen.getByText("Comfortable shoes for all occasions")).toBeInTheDocument();
    expect(screen.getByText("Price: $99")).toBeInTheDocument();
    expect(screen.getByText("Brand: TestBrand")).toBeInTheDocument();
    expect(screen.getByText("Category: Footwear")).toBeInTheDocument();
  });

  it("shows 'Product not found.' if product is null", () => {
    render(<ProductDetailPage market="en" product={null as any} />);
    expect(screen.getByText("Product not found.")).toBeInTheDocument();
  });
});
