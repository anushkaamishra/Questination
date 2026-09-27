import { useState, useEffect } from "react";
import { ShieldCheck, Check } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { getToken } from "../api/auth";

const API_BASE = "https://questination-production.up.railway.app";

function ApprovalQueue() {
  const [sellerId, setSellerId] = useState("");
  const [cityId, setCityId] = useState("");
  const [craftName, setCraftName] = useState("");
  const [craftOptions, setCraftOptions] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cityId) {
      setCraftOptions([]);
      return;
    }
    async function fetchCraftCategories() {
      try {
        const response = await fetch(
          `${API_BASE}/api/preferences/cities/${cityId}/craft-categories`
        );
        const data = await response.json();
        if (response.ok && Array.isArray(data)) {
          setCraftOptions(data);
        } else if (response.ok && Array.isArray(data.categories)) {
          setCraftOptions(data.categories);
        } else {
          setCraftOptions([]);
        }
      } catch (err) {
        setCraftOptions([]);
      }
    }
    fetchCraftCategories();
  }, [cityId]);

  async function handleVerify() {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE}/api/sellers/${sellerId}/verify-craft`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ craftName, city_id: cityId }),
      });
      if (response.ok) {
        setSuccess(true);
        setSellerId("");
        setCraftName("");
        setCityId("");
      } else {
        setError("Could not verify seller. Check the Seller ID and try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeader title="Verify Seller" subtitle="Assign craft type and city to approve a seller." />
      <div className="bg-white p-8 rounded-2xl shadow-lg shadow-emerald-900/5 w-full max-w-md border border-amber-100">
        <div className="flex items-center gap-2 mb-4 text-emerald-700">
          <ShieldCheck size={22} />
          <span className="font-semibold">Seller Verification</span>
        </div>

        <label className="block text-sm font-medium mb-1 text-gray-700">Seller ID</label>
        <input
          type="text"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />

        <label className="block text-sm font-medium mb-1 text-gray-700">
          City ID <span className="text-gray-400 font-normal">(e.g. city-lucknow, city-varanasi)</span>
        </label>
        <input
          type="text"
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />

        <label className="block text-sm font-medium mb-1 text-gray-700">Craft Name</label>
        {craftOptions.length > 0 ? (
          <select
            value={craftName}
            onChange={(e) => setCraftName(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          >
            <option value="">Select a craft category</option>
            {craftOptions.map((craft) => (
              <option key={craft} value={craft}>
                {craft}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={craftName}
            onChange={(e) => setCraftName(e.target.value)}
            placeholder={cityId ? "No categories found - type manually" : "Enter City ID first"}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          />
        )}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white py-3 rounded-lg font-medium hover:bg-emerald-800 transition disabled:opacity-60"
        >
          <Check size={18} /> {loading ? "Verifying..." : "Verify Seller"}
        </button>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-3 font-medium">Seller verified successfully!</p>}
      </div>
    </div>
  );
}

export default ApprovalQueue;