// apps/project-a/pages/[market]/product/__tests__/id.test.tsx
import { render, screen } from "@testing-library/react";
import ProductDetailPage from "../pages/[market]/product/[id]";
import "@testing-library/jest-dom";

describe("[market]/product/[id].tsx", () => {
  it("shows product details if product exists", () => {
    render(
      <ProductDetailPage
        market="en"
        product={{
          id: 101,
          title: "Test Product",
          description: "A test product description",
          price: 99,
          brand: "TestBrand",
          category: "TestCategory",
          thumbnail: "/img.jpg",
        }}
      />
    );

    expect(screen.getByText("Product Detail - EN")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("A test product description")).toBeInTheDocument();
    expect(screen.getByText("Price: $99")).toBeInTheDocument();
    expect(screen.getByText("Brand: TestBrand")).toBeInTheDocument();
    expect(screen.getByText("Category: TestCategory")).toBeInTheDocument();
  });

  it("shows 'Product not found.' if product is null/undefined", () => {
    render(<ProductDetailPage market="en" product={null as any} />);

    expect(screen.getByText("Product not found.")).toBeInTheDocument();
  });
});
