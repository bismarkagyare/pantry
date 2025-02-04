import { TopHeader } from "./top-header";
import { MainHeader } from "./main-header";
import { NavHeader } from "./nav-header";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <TopHeader />
      <MainHeader />
      <NavHeader />
    </header>
  );
}
