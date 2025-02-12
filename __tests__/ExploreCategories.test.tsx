import { render, screen } from "@testing-library/react";
import { ExploreCategories } from "@/components/home/explore-categories";

describe("Explore Categories", () => {
  it("renders all category links", () => {
    render(<ExploreCategories />);

    // Use more specific queries with test-ids
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Explore Categories")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();

    // Test the category grid
    const categoryGrid = screen.getByRole("grid");
    expect(categoryGrid).toBeInTheDocument();

    // Test category cards
    const categoryLinks = screen.getAllByRole("link");
    expect(categoryLinks).toHaveLength(7); // 6 categories + "All" link
  });
});
