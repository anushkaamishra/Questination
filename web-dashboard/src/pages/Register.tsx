import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import PalaceSkyline from "../components/PalaceSkyline";

const API_BASE = "https://questination-production.up.railway.app";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, phone, role: "seller" }),
      });
      const data = await response.json().catch(() => null);

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data?.message || `Registration failed (status ${response.status})`);
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
        <p className="text-lg font-medium text-gray-600 mb-6">Seller Sign Up</p>

        <label className="block text-sm font-medium mb-1 text-gray-700">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />

        <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />

        <label className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          onClick={handleRegister}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white py-3 rounded-lg font-medium hover:bg-emerald-800 transition disabled:opacity-60"
        >
          <UserPlus size={18} /> {loading ? "Creating..." : "Create Account"}
        </button>

        {error && <p className="text-red-600 text-sm mt-3 break-words">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm mt-3">Account created! Redirecting to login...</p>
        )}

        <p className="text-base font-semibold text-gray-700 mt-5 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-700 font-bold">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;