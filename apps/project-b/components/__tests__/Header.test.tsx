import { render, screen } from "@testing-library/react";
import { Header } from "../Header";
import "@testing-library/jest-dom";

describe("Header (Project B)", () => {
  it("renders three navigation links (Home, Products, Login)", () => {
    render(<Header market="en" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();

    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/en");
  });
});
