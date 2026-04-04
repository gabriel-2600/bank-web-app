import { Link } from "react-router";

function NavBar() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create-account">Create Account</Link>
      </nav>
    </div>
  );
}

export default NavBar;
