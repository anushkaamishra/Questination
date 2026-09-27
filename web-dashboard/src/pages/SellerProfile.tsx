import { useState } from "react";
import { Store, CheckCircle2, IdCard } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { getUserId } from "../api/auth";

const API_BASE = "https://questination-production.up.railway.app";

function SellerProfile() {
  const [shopName, setShopName] = useState("");
  const [docId, setDocId] = useState("");
  const [description, setDescription] = useState("");
  const [taxBracket, setTaxBracket] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setLoading(true);
    setError("");
    try {
      const userId = getUserId();
      const response = await fetch(`${API_BASE}/api/sellers/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          shop_name: shopName,
          description,
          tax_bracket_tier: taxBracket,
          udyam_pehchan_id: docId,
        }),
      });
      if (response.ok) {
        setSaved(true);
      } else {
        setError("Could not save profile. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeader title="Seller Profile" subtitle="Set up your shop so tourists can find and support you." />
      <div className="bg-white p-8 rounded-2xl shadow-lg shadow-emerald-900/5 w-full max-w-md border border-amber-100">
        <div className="flex items-center gap-2 mb-4 text-emerald-700">
          <Store size={22} />
          <span className="font-semibold">Shop Details</span>
        </div>

        <label className="block text-sm font-medium mb-1 text-gray-700">Shop Name</label>
        <input
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />

        <div className="flex items-center gap-2 mb-1 text-gray-700">
          <IdCard size={16} />
          <label className="text-sm font-medium">Udyam / PEHCHAN ID</label>
        </div>
        <input
          type="text"
          value={docId}
          onChange={(e) => setDocId(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />

        <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />

        <label className="block text-sm font-medium mb-1 text-gray-700">Tax Bracket Tier</label>
        <input
          type="text"
          value={taxBracket}
          onChange={(e) => setTaxBracket(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-emerald-700 text-white py-3 rounded-lg font-medium hover:bg-emerald-800 transition shadow-md shadow-emerald-900/20 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        {saved && (
          <div className="mt-5 flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-lg">
            <CheckCircle2 size={20} />
            <span className="font-medium">Profile saved!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerProfile;