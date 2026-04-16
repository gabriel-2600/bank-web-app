import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";

import NavBar from "./components/NavBar";
import type { AccountInterface } from "./types/AccountInterface";
// import Footer from "./components/Footer";

function App() {
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);

  return (
    <>
      <NavBar />
      <Outlet context={{ accounts, setAccounts }} />
      <Toaster />
    </>
  );
}

export default App;
