import { useState } from "react";
import { UserCog, Check } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { getToken } from "../api/auth";

const API_BASE = "https://questination-production.up.railway.app";

function PromoteUser() {
  const [userId, setUserId] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePromote() {
    if (!userId) return;
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE}/auth/promotion/${userId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json().catch(() => null);

      if (response.ok) {
        setSuccess(true);
        setUserId("");
      } else {
        setError(data?.message || "Could not promote user. Check the User ID and try again.");
      }
    } catch (err: any) {
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeader title="Promote to Admin" subtitle="Give an existing user admin access." />
      <div className="bg-white p-8 rounded-2xl shadow-lg shadow-emerald-900/5 w-full max-w-md border border-amber-100">
        <div className="flex items-center gap-2 mb-4 text-emerald-700">
          <UserCog size={22} />
          <span className="font-semibold">Promote User</span>
        </div>

        <label className="block text-sm font-medium mb-1 text-gray-700">User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />

        <button
          onClick={handlePromote}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white py-3 rounded-lg font-medium hover:bg-emerald-800 transition disabled:opacity-60"
        >
          <Check size={18} /> {loading ? "Promoting..." : "Promote to Admin"}
        </button>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-3 font-medium">User promoted to admin!</p>}
      </div>
    </div>
  );
}

export default PromoteUser;