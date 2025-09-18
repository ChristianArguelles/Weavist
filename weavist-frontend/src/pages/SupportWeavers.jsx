import React, { useState, useEffect } from "react";
import { api } from "../api/client";

export default function SupportWeavers() {
  const [campaigns, setCampaigns] = useState([]);
  const [donationAmount, setDonationAmount] = useState({});
  const [donationMethod, setDonationMethod] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  async function fetchCampaigns() {
    try {
      const res = await api.get("/campaigns");
      const data = Array.isArray(res.data) ? res.data : (res.data.data || res.data);
      setCampaigns(data);
    } catch (e) {
      console.error("Error fetching campaigns:", e);
    }
  }

  async function handleDonate(campaignId) {
    const amount = donationAmount[campaignId];
    const method = donationMethod[campaignId] || "card";
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Enter a valid donation amount");
      return;
    }
    setLoadingId(campaignId);
    try {
      const res = await api.post(
        "/donations",
        {
          campaign_id: campaignId,
          amount,
          donationMethod: method,
        },
        { withCredentials: true }
      );
      alert(res.data.message || "Donation successful");
      
      setDonationAmount((prev) => ({ ...prev, [campaignId]: "" }));
      setDonationMethod((prev) => ({ ...prev, [campaignId]: "card" }));
      fetchCampaigns();
    } catch (err) {
      console.error("Donation error:", err);
      alert("Donation failed, try again");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Support Weavers
        </h1>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full"
            >
              {c.image && (
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-semibold text-gray-800">{c.title}</h3>
                <p className="text-gray-600 mt-2 flex-grow">
                  {c.description?.slice(0, 120)}...
                </p>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (c.raisedAmount / (c.donationTarget || 1)) * 100)
                          }%`,
                      }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    ₱{c.raisedAmount} raised of ₱{c.donationTarget}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter amount"
                    value={donationAmount[c.id] || ""}
                    onChange={(e) =>
                      setDonationAmount((prev) => ({
                        ...prev,
                        [c.id]: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <select
                    value={donationMethod[c.id] || "card"}
                    onChange={(e) =>
                      setDonationMethod((prev) => ({
                        ...prev,
                        [c.id]: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="card">Card</option>
                    <option value="gcash">GCash</option>
                    <option value="paypal">PayPal</option>
                  </select>

                  <button
                    onClick={() => handleDonate(c.id)}
                    disabled={loadingId === c.id}
                    className={`w-full text-white py-2 rounded-lg text-lg ${
                      loadingId === c.id
                        ? "bg-indigo-400"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } transition`}
                  >
                    {loadingId === c.id ? "Processing..." : "Donate Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}