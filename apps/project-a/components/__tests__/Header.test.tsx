import { render, screen } from "@testing-library/react";
import { Header } from "../Header";
import "@testing-library/jest-dom";

describe("Header component", () => {
  it("renders three navigation links (Home, Products, Login)", () => {
    render(<Header market="en" />);

    // Check for text "Home", "Products", "Login"
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();

    // Optional: check the actual href for the links
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/en");

    const productsLink = screen.getByText("Products").closest("a");
    expect(productsLink).toHaveAttribute("href", "/en/products");

    const loginLink = screen.getByText("Login").closest("a");
    expect(loginLink).toHaveAttribute("href", "/en/login");
  });
});
