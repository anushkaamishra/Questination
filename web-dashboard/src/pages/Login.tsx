import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import { saveToken, saveRefreshToken, saveUserId, decodeToken } from "../api/auth";
import { LogIn, Store, ShieldCheck } from "lucide-react";
import PalaceSkyline from "../components/PalaceSkyline";

const API_BASE = "https://questination-production.up.railway.app";

function Login() {
  const [loginAs, setLoginAs] = useState<"seller" | "admin">("seller");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notForDashboard, setNotForDashboard] = useState(false);
  const { setRole } = useRole();
  const navigate = useNavigate();

  async function handleLogin() {
    setLoading(true);
    setError("");
    setNotForDashboard(false);
    try {
      const response = await fetch(`${API_BASE}/auth/log-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const rawText = await response.text();
      let data: any = null;
      try {
        data = JSON.parse(rawText);
      } catch {
        setError(`Status ${response.status}. Raw response: ${rawText.slice(0, 200)}`);
        setLoading(false);
        return;
      }

      if (response.ok && data?.token) {
        saveToken(data.token);
        if (data.refreshtoken) saveRefreshToken(data.refreshtoken);

        const decoded = decodeToken(data.token);
        if (decoded) {
          saveUserId(decoded.id);
          if (decoded.role === "seller" || decoded.role === "admin") {
            setRole(decoded.role as "seller" | "admin");
            navigate("/");
          } else {
            setNotForDashboard(true);
          }
        } else {
          setError("Login succeeded but token could not be decoded.");
        }
      } else {
        setError(`Status ${response.status}: ${data?.message || JSON.stringify(data)}`);
      }
    } catch (err: any) {
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 flex items-center justify-center overflow-hidden">
      <PalaceSkyline />
      <div className="relative bg-white p-10 rounded-2xl shadow-lg shadow-emerald-900/10 border border-amber-100 w-[400px]">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Questination</h1>
        <p className="text-lg font-medium text-gray-600 mb-6">
          {loginAs === "seller" ? "Seller Login" : "Admin Login"}
        </p>

        <div className="flex gap-3 mb-5">
          <button
            type="button"
            onClick={() => setLoginAs("seller")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition ${
              loginAs === "seller" ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            <Store size={16} /> Seller
          </button>
          <button
            type="button"
            onClick={() => setLoginAs("admin")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition ${
              loginAs === "admin" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            <ShieldCheck size={16} /> Admin
          </button>
        </div>

        <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />

        <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white py-3 rounded-lg font-medium hover:bg-emerald-800 transition disabled:opacity-60"
        >
          <LogIn size={18} /> {loading ? "Logging in..." : "Log In"}
        </button>

        {error && <p className="text-red-600 text-sm mt-3 break-words">{error}</p>}
        {notForDashboard && (
          <p className="text-amber-700 text-sm mt-3">
            This dashboard is for sellers and admins only. Your account role doesn't have access here.
          </p>
        )}

        {loginAs === "seller" && (
          <p className="text-base font-semibold text-gray-700 mt-5 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-emerald-700 font-bold">Sign up</Link>
          </p>
        )}
        {loginAs === "admin" && (
          <p className="text-sm text-gray-500 mt-5 text-center">
            Admin accounts are created by an existing admin, not through sign-up.
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;