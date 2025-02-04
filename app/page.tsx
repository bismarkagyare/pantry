import { Header } from "@/components/layout/header";
import { Hero } from "@/components/home/hero";
import { checkUser } from "@/lib/checkUser";

export default async function HomePage() {
  await checkUser();

  return (
    <main>
      <Header />
      <section>
        <Hero />
      </section>
    </main>
  );
}
