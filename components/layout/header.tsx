import { TopHeader } from "./top-header";
import { MainHeader } from "./main-header";
import { NavHeader } from "./nav-header";

//sticky top-0 z-50
export function Header() {
  return (
    <header className="bg-white">
      <TopHeader />
      <MainHeader />
      <NavHeader />
    </header>
  );
}
