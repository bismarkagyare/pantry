import { Header } from "@/components/layout/header";
import { Hero } from "@/components/home/hero";
import ProductsGrid from "@/components/products/products-grid";
import { ExploreCategories } from "@/components/home/explore-categories";
import { checkUser } from "@/lib/checkUser";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await checkUser();

  return (
    <main>
      <Header />
      <section>
        <Hero />
      </section>
      <section>
        <ExploreCategories />
      </section>
      <section>
        <ProductsGrid/>
      </section>
    </main>
  );
}
