import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../src/Button";

describe("<Button />", () => {
  it("renders the given label", () => {
    render(<Button label="Test Button" />);
    // Query by the button role, checking the label
    const buttonElement = screen.getByRole("button", { name: /test button/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = jest.fn();
    render(<Button label="Clickable" onClick={handleClick} />);
    const buttonElement = screen.getByRole("button", { name: /clickable/i });

    await userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom styles", () => {
    render(
      <Button
        label="Styled Button"
        style={{ backgroundColor: "red", fontSize: "1.2rem" }}
      />
    );
    const buttonElement = screen.getByRole("button", { name: /styled button/i });
    // Example style checks
    expect(buttonElement).toHaveStyle("background-color: red");
    expect(buttonElement).toHaveStyle("font-size: 1.2rem");
  });
});
