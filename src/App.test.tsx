import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Header", () => {
  it("renders correctly", () => {
    render(<App />);

    const appComponent = screen.getByTestId(`app`);
    expect(appComponent).toBeInTheDocument();
  });
});
