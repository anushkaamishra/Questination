import { useState } from "react";

type SellerApplication = {
  sellerId: string;
  shopName: string;
  address: string;
  craftName: string;
  documentId: string;
};

const initialApplications: SellerApplication[] = [
  {
    sellerId: "seller-ramesh",
    shopName: "Ramesh Handicrafts",
    address: "Lucknow, Uttar Pradesh",
    craftName: "Chikankari",
    documentId: "UDYAM-2938",
  },
  {
    sellerId: "seller-pottery",
    shopName: "Local Pottery Co.",
    address: "Lucknow, Uttar Pradesh",
    craftName: "Terracotta",
    documentId: "ODOP-4471",
  },
  {
    sellerId: "seller-awadh",
    shopName: "Awadh Craft House",
    address: "Lucknow, Uttar Pradesh",
    craftName: "Handicrafts",
    documentId: "UDYAM-5812",
  },
  {
    sellerId: "seller-gomti",
    shopName: "Gomti Terracotta Works",
    address: "Lucknow, Uttar Pradesh",
    craftName: "Terracotta",
    documentId: "ODOP-7316",
  },
  {
    sellerId: "seller-chikankari",
    shopName: "Chikankari Heritage Studio",
    address: "Lucknow, Uttar Pradesh",
    craftName: "Chikankari",
    documentId: "UDYAM-9045",
  },
];

export default function ApprovalQueue() {
  const [applications, setApplications] =
    useState<SellerApplication[]>(initialApplications);

  const [selectedSeller, setSelectedSeller] =
    useState<SellerApplication | null>(null);

  const [message, setMessage] = useState("");

  const handleVerify = () => {
    if (!selectedSeller) return;

    setApplications((prev) =>
      prev.filter((seller) => seller.sellerId !== selectedSeller.sellerId)
    );

    setMessage(
      `${selectedSeller.shopName} has been verified successfully.`
    );

    setSelectedSeller(null);
  };

  const handleReject = () => {
    if (!selectedSeller) return;

    setApplications((prev) =>
      prev.filter((seller) => seller.sellerId !== selectedSeller.sellerId)
    );

    setMessage(
      `${selectedSeller.shopName} has been rejected.`
    );

    setSelectedSeller(null);
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-[#064f42]">
          Verify Seller
        </h1>

        <p className="mt-2 text-gray-600">
          Review pending seller applications before approving them.
        </p>
      </div>

      {/* SUCCESS / STATUS MESSAGE */}
      {message && (
        <div className="rounded-xl border border-[#b9e4d8] bg-[#f0faf7] px-5 py-4 text-sm font-semibold text-[#087f68]">
          {message}
        </div>
      )}

      {/* PENDING APPLICATIONS */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#064f42]">
              Pending Seller Applications
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Select an application to review the submitted seller details.
            </p>
          </div>

          <span className="rounded-full bg-[#e8f7f2] px-4 py-2 text-sm font-semibold text-[#087f68]">
            {applications.length} Pending
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 px-6 py-12 text-center">
            <p className="font-semibold text-gray-600">
              No pending seller applications.
            </p>

            <p className="mt-1 text-sm text-gray-400">
              New seller applications will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((seller) => (
              <div
                key={seller.sellerId}
                className="flex flex-col gap-5 rounded-xl border border-gray-100 p-5 transition hover:border-[#b9e4d8] hover:bg-[#fbfefd] md:flex-row md:items-center md:justify-between"
              >
                {/* SELLER SUMMARY */}
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-gray-800">
                    {seller.shopName}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
                    <span>{seller.craftName}</span>
                    <span>{seller.address}</span>
                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    Seller ID: {seller.sellerId}
                  </p>
                </div>

                {/* REVIEW BUTTON */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSeller(seller);
                    setMessage("");
                  }}
                  className="shrink-0 rounded-xl border border-[#087f68] px-5 py-2.5 font-semibold text-[#087f68] transition hover:bg-[#087f68] hover:text-white"
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* REVIEW MODAL */}
      {selectedSeller && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#087f68]">
                  Seller Application
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#064f42]">
                  {selectedSeller.shopName}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSeller(null)}
                className="text-2xl leading-none text-gray-400 hover:text-gray-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* DETAILS */}
            <div className="mt-6 overflow-hidden rounded-xl border border-gray-100">
              <div className="grid grid-cols-1 divide-y divide-gray-100 md:grid-cols-2 md:divide-x md:divide-y-0">
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Seller/User ID
                  </p>

                  <p className="mt-1 font-medium text-gray-800">
                    {selectedSeller.sellerId}
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Shop Name
                  </p>

                  <p className="mt-1 font-medium text-gray-800">
                    {selectedSeller.shopName}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Address
                </p>

                <p className="mt-1 font-medium text-gray-800">
                  {selectedSeller.address}
                </p>
              </div>

              <div className="grid grid-cols-1 divide-y divide-gray-100 border-t md:grid-cols-2 md:divide-x md:divide-y-0">
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Craft
                  </p>

                  <p className="mt-1 font-medium text-gray-800">
                    {selectedSeller.craftName}
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    UDYAM / Document ID
                  </p>

                  <p className="mt-1 font-medium text-gray-800">
                    {selectedSeller.documentId}
                  </p>
                </div>
              </div>
            </div>

            {/* REVIEW NOTE */}
            <div className="mt-5 rounded-xl bg-[#f5faf8] p-4">
              <p className="text-sm leading-6 text-gray-600">
                Review the submitted seller information and supporting
                details before approving this application.
              </p>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleReject}
                className="rounded-xl border border-red-200 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50"
              >
                Reject
              </button>

              <button
                type="button"
                onClick={handleVerify}
                className="rounded-xl bg-[#087f68] px-6 py-3 font-semibold text-white transition hover:bg-[#066a58]"
              >
                Verify Seller
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}