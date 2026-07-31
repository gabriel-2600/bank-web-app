import { logoutApi } from "../../auth/api/logoutApi";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const performLogout = async () => {
    logout();
    navigate("/login", { replace: true });

    await logoutApi();
  };
  return (
    <button
      onClick={performLogout}
      className="block rounded-lg px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-black/5 hover:text-[#8494FF]"
    >
      Logout
    </button>
  );
}

export default Logout;
