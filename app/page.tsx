//import { Header } from "@/components/layout/header";
import { Hero } from "@/components/home/hero";
import ProductsGrid from "@/components/products/products-grid";
import { ExploreCategories } from "@/components/home/explore-categories";
import { KeySellingPoints } from "@/components/home/key-selling-points";
import { checkUser } from "@/lib/checkUser";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    await checkUser();
  } catch (error) {
    console.error("Failed to check user:", error);
  }

  return (
    <main>
      {/* <Header /> */}
      <section>
        <Hero />
      </section>
      <section>
        <ExploreCategories />
      </section>
      <section>
        <ProductsGrid />
      </section>
      <section>
        <KeySellingPoints />
      </section>
    </main>
  );
}
