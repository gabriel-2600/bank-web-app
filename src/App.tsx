import { useState } from "react";
import { Outlet } from "react-router";

import NavBar from "./components/NavBar";
import type { AccountInterface } from "./types/AccountInterface";
// import Footer from "./components/Footer";

function App() {
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);

  console.log(accounts);
  return (
    <>
      <NavBar />
      <Outlet context={{ accounts, setAccounts }} />
      {/* <Footer /> */}
    </>
  );
}

export default App;
