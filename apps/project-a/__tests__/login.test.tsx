// apps/project-a/pages/__tests__/login.test.tsx
import { render, screen } from "@testing-library/react";
import LoginPage from "../pages/[market]/login";
import "@testing-library/jest-dom";

describe("[market]/login.tsx", () => {
  it("shows 'You are logged in!' if loggedIn is true", () => {
    render(<LoginPage market="en" loggedIn={true} />);

    expect(screen.getByText("You are logged in!")).toBeInTheDocument();
    expect(screen.queryByText("Login – Market: en")).not.toBeInTheDocument();
  });

  it("shows the login form if loggedIn is false", () => {
    render(<LoginPage market="ca" loggedIn={false} />);

    expect(screen.getByText("Login – Market: ca")).toBeInTheDocument();
    // Fields
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  it("displays error message if provided via prop", () => {
    render(<LoginPage market="en" error="Invalid credentials!" />);

    expect(screen.getByText("Invalid credentials!")).toBeInTheDocument();
  });
});
