// apps/project-b/pages/[market]/__tests__/login.test.tsx
import { render, screen } from "@testing-library/react";
import LoginPage from "../pages/[market]/login";
import "@testing-library/jest-dom";

describe("Project B - [market]/login", () => {
  it("shows login form if not logged in", () => {
    render(<LoginPage market="en" />);
    expect(screen.getByText("Login – Market: en")).toBeInTheDocument();
    // Now these pass because the label is associated to input via htmlFor / id
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  it("shows 'You are logged in!' if loggedIn is true", () => {
    render(<LoginPage market="ca" loggedIn />);
    expect(screen.getByText("You are logged in!")).toBeInTheDocument();
    expect(screen.queryByText("Login – Market: ca")).not.toBeInTheDocument();
  });

  it("displays error if provided", () => {
    render(<LoginPage market="en" error="Invalid credentials!" />);
    expect(screen.getByText("Invalid credentials!")).toBeInTheDocument();
  });
});
