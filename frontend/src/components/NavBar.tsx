import { Link } from "react-router";

function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight text-black transition-colors hover:text-[#8494FF]"
        >
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-[#8494FF]"
            aria-hidden
          />
          BankApp
        </Link>

        <ul className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              to="/"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-black/5 hover:text-[#8494FF]"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/create-bank-account"
              className="block rounded-full bg-[#8494FF] px-4 py-2 text-sm font-semibold text-white transition-[filter] hover:brightness-105"
            >
              Create Bank Account
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
