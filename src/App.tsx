import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
// import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;
