import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { KeySellingPoints } from "@/components/home/key-selling-points";

describe("Key Selling Points", () => {
  it("renders all selling points", () => {
    render(<KeySellingPoints />);

    expect(screen.getByText("Refundable")).toBeInTheDocument();
    expect(screen.getByText("Free delivery")).toBeInTheDocument();
  });

  it('renders images for each selling point', () => {
    render(<KeySellingPoints />)
    
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3)
  })
});
