import React, { useState, useEffect } from "react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function SupportWeavers() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [user, setUser] = useState({});
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user: authUser } = useAuth();

  useEffect(() => {
    fetchCampaigns();
    // Prefer auth context user (already stored on login) for instant display
    if (authUser) {
      setUser(authUser);
      setContactName(authUser.name || "");
      setContactPhone(authUser.phone || "");
      setContactEmail(authUser.email || "");
    } else {
      fetchUser();
    }
  }, [authUser]);

  async function fetchCampaigns() {
    try {
      const res = await api.get("/campaigns");
      const data = Array.isArray(res.data) ? res.data : res.data.data || res.data;
      setCampaigns(data);
    } catch (e) {
      console.error("Error fetching campaigns:", e);
    }
  }

  async function fetchUser() {
    try {
      // backend exposes current user at GET /profile
      const res = await api.get("/profile");
      const u = res.data?.user || res.data;
      setUser(u);
      setContactName(u?.name || "");
      setContactPhone(u?.phone || "");
      setContactEmail(u?.email || "");
    } catch (e) {
      console.error("Error fetching user:", e);
    }
  }

  async function handleDonate() {
    const amount = selectedAmount === "custom" ? Number(customAmount) : Number(selectedAmount);
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(
        "/donations",
        {
          campaign_id: campaigns[0]?.id, // for now, donate to first campaign
          amount,
          method: paymentMethod,
          donor: {
            name: contactName,
            phone: contactPhone,
            email: contactEmail,
          },
        },
        { withCredentials: true }
      );
      alert(res.data.message || "Donation successful!");
      setSelectedAmount(null);
      setCustomAmount("");
      setPaymentMethod("");
    } catch (err) {
      console.error("Donation error:", err);
      alert("Donation failed, please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="container py-12 text-center">
        <h1 className="text-4xl font-bold">Empowering Our Weavers</h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
      </div>

      <div className="container py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Campaign</h2>
        <div className="max-w-3xl mx-auto mb-8 text-center text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </div>

        <div className="border-t"></div>

        {/* Donation Amount */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Choose Donation Amount</h3>
          <div className="flex gap-3 mb-6">
            {[100, 500, 1000].map((amt) => (
              <button
                key={amt}
                onClick={() => setSelectedAmount(amt)}
                className={`px-6 py-3 rounded-full border ${
                  selectedAmount === amt ? "bg-weave-red text-white" : ""
                }`}
              >
                ₱ {amt}
              </button>
            ))}
            <button
              onClick={() => setSelectedAmount("custom")}
              className={`px-6 py-3 rounded-full border ${
                selectedAmount === "custom" ? "bg-weave-red text-white" : ""
              }`}
            >
              Custom
            </button>
          </div>

          {selectedAmount === "custom" && (
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter custom amount"
              className="border rounded px-4 py-3 mb-6 w-64"
            />
          )}

          {/* User Details */}
          <h4 className="text-lg font-semibold mb-2">Your Details</h4>
          <div className="grid grid-cols-1 gap-2 mb-8 text-left">
            <div className="text-sm text-gray-600">Full name</div>
            <div className="font-medium text-lg">{contactName || user.name || '—'}</div>

            <div className="mt-3 text-sm text-gray-600">Phone number</div>
            <div className="font-medium text-lg">{contactPhone || user.phone || '—'}</div>

            <div className="mt-3 text-sm text-gray-600">Email address</div>
            <div className="font-medium text-lg">{contactEmail || user.email || '—'}</div>
          </div>

          {/* Payment Method */}
          <h4 className="text-lg font-semibold mb-3">Payment Method</h4>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {["gcash", "maya", "card"].map((method) => (
              <div
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`p-6 border rounded text-center cursor-pointer ${
                  paymentMethod === method ? "ring-2 ring-weave-red" : ""
                }`}
              >
                {method === "gcash" && "Gcash"}
                {method === "maya" && "Maya"}
                {method === "card" && "Credit Card"}
              </div>
            ))}
          </div>

          {paymentMethod === "gcash" && (
            <div className="mb-8">
              <label className="block mb-2 text-sm">Gcash Phone Number</label>
              <input className="w-full border rounded px-4 py-3" />
            </div>
          )}

          {/* Donate Now Button */}
          <div className="text-center">
            <button
              onClick={handleDonate}
              disabled={loading}
              className="px-12 py-4 rounded-full bg-weave-red text-white"
            >
              {loading ? "Processing..." : "Donate Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
