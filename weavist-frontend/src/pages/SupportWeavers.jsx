import React, { useState, useEffect, useRef } from "react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function SupportWeavers() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [user, setUser] = useState({});
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Payment fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [gcashNumber, setGcashNumber] = useState("");

  const { user: authUser } = useAuth();

  // Backend base URL
  const API_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
      setContactName(authUser.name || "");
      setContactEmail(authUser.email || "");
    }
    fetchCampaigns();
  }, [authUser]);

  const fetchCampaigns = async () => {
    try {
      const resp = await api.get("/campaigns");
      setCampaigns(resp.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load campaigns");
    }
  };

  // Modal state
  const [viewingCampaign, setViewingCampaign] = useState(null);
  const modalRef = useRef(null);

  const amount = selectedAmount || Number(customAmount || 0);

  const handleDonate = async () => {
    if (!selectedCampaign) {
      alert("Please select a campaign to donate to");
      return;
    }
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method before donating");
      return;
    }

    // Validate payment fields
    if (paymentMethod === "card") {
      if (!cardNumber || !cardExpiry || !cardCVV) {
        alert("Please fill in all card details before donating");
        return;
      }
    }
    if (paymentMethod === "paypal" && !paypalEmail) {
      alert("Please enter your PayPal email before donating");
      return;
    }
    if (paymentMethod === "gcash" && !gcashNumber) {
      alert("Please enter your GCash number before donating");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        campaign_id: selectedCampaign,
        amount: amount,
        donor_name: contactName,
        donor_phone: contactPhone,
        donor_email: contactEmail,
        donationMethod: paymentMethod || "manual",
      };

      const resp = await api.post("/donations", payload, {
        withCredentials: true,
      });

      alert(resp.data.message || "Donation successful! Thank you.");

      setCampaigns((prev) =>
        prev.map((c) =>
          c.id == selectedCampaign
            ? { ...c, raisedAmount: Number(c.raisedAmount) + Number(amount) }
            : c
        )
      );

      // reset form
      setSelectedAmount(null);
      setCustomAmount("");
      setPaymentMethod("");
      setCardNumber("");
      setCardExpiry("");
      setCardCVV("");
      setPaypalEmail("");
      setGcashNumber("");
    } catch (err) {
      console.error("Donation error:", err);
      alert(err.response?.data?.message || "Donation failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Pagination (carousel)
  const itemsPerPage = 1;
  const totalPages = Math.ceil(campaigns.length / itemsPerPage);
  const pageItems = campaigns.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    if (pageItems.length > 0) {
      setSelectedCampaign(pageItems[0].id);
    }
  }, [page, campaigns]);

  // Close modal on Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setViewingCampaign(null);
    }
    if (viewingCampaign) {
      window.addEventListener("keydown", onKey);
    }
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [viewingCampaign]);

  return (
    <>
      {/* Header */}
      <div className="container py-12 text-center">
        <h1 className="text-4xl font-bold">Empowering Our Weavers</h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Support indigenous weaving communities by contributing to ongoing
          campaigns that fund materials, training, and fair wages.
        </p>
      </div>

      {/* Campaign carousel */}
      <div className="container py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Choose a Campaign
        </h2>

        {campaigns.length > 0 ? (
          <div className="flex items-center justify-center gap-6">
            {/* Prev */}
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-3 bg-white border rounded-full hover:shadow"
            >
              ◀
            </button>

            {pageItems.map((c) => {
              const imageUrl = c.image
                ? c.image.startsWith("http")
                  ? c.image
                  : `${API_URL}${c.image}`
                : null;

              return (
                <div
                  key={c.id}
                  className={`p-6 border rounded-lg cursor-pointer transition-shadow text-center w-150 ${
                    selectedCampaign == c.id
                      ? "ring-2 ring-accent bg-accent/10"
                      : "hover:shadow-lg"
                  }`}
                >
                  <div
                    onClick={() => {
                      setSelectedCampaign(c.id);
                      setViewingCampaign(c);
                    }}
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={c.title}
                        className="w-full h-40 object-cover rounded mb-3"
                      />
                    )}
                    <h3 className="text-lg font-semibold">{c.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 one-line">
                      {c.description || "Support local weavers"}
                    </p>
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-bold" style={{ color: '#3b2b2a' }}>
                          ₱{Number(c.raisedAmount || 0).toFixed(2)} raised
                        </div>
                        <div className="text-sm text-gray-500">
                          ₱{Number(c.donationTarget || 0).toFixed(2)} goal
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${Math.min(100, ((c.raisedAmount || 0) / (c.donationTarget || 1)) * 100)}%`,
                            backgroundColor: '#3b2b2a'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Next */}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-3 bg-white border rounded-full hover:shadow"
            >
              ▶
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            No active campaigns at the moment.
          </div>
        )}

        {/* Dots */}
        {campaigns.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <span
                key={idx}
                className={`h-3 w-3 rounded-full ${
                  page === idx + 1 ? "bg-accent" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        )}
      </div>

      {/* Donation Form */}
      <div className="container py-8 max-w-2xl">
        {/* Amount */}
        <h3 className="text-xl font-semibold mb-4 text-accent">
          Choose Donation Amount
        </h3>
        <div className="flex gap-4 mb-6 flex-wrap">
          {[100, 200, 500, 1000].map((val) => (
            <button
              key={val}
              onClick={() => {
                setSelectedAmount(val);
                setCustomAmount("");
              }}
              className={`px-6 py-3 border rounded-lg ${
                selectedAmount === val
                  ? "bg-accent text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              ₱{val}
            </button>
          ))}
          <input
            type="number"
            placeholder="Custom"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            className="px-4 py-3 border rounded-lg w-32"
          />
        </div>

        {/* User details */}
        <h3 className="text-xl font-semibold mb-4 text-accent">Your Details</h3>
        <div className="mb-8 grid gap-2 text-left">
          <div className="text-sm text-gray-600">Full name</div>
          <div className="font-medium text-lg">
            {contactName || user.name || "—"}
          </div>

          <div className="mt-3 text-sm text-gray-600">Phone number</div>
          <div className="font-medium text-lg">
            {contactPhone || user.phone || "—"}
          </div>

          <div className="mt-3 text-sm text-gray-600">Email address</div>
          <div className="font-medium text-lg">
            {contactEmail || user.email || "—"}
          </div>
        </div>

        {/* Payment */}
        <h3 className="text-xl font-semibold mb-4 text-accent">
          Payment Method
        </h3>
        <div className="flex gap-4 mb-6">
          {["card", "paypal", "gcash"].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`px-6 py-3 border rounded-lg capitalize ${
                paymentMethod === method
                  ? "bg-accent text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {method}
            </button>
          ))}
        </div>

        {/* Conditional fields */}
        {paymentMethod === "card" && (
          <div className="mb-6 space-y-3">
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                className="w-1/2 border rounded-lg px-4 py-3"
              />
              <input
                type="text"
                placeholder="CVV"
                value={cardCVV}
                onChange={(e) => setCardCVV(e.target.value)}
                className="w-1/2 border rounded-lg px-4 py-3"
              />
            </div>
          </div>
        )}

        {paymentMethod === "paypal" && (
          <div className="mb-6">
            <input
              type="email"
              placeholder="PayPal Email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
        )}

        {paymentMethod === "gcash" && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="GCash Number"
              value={gcashNumber}
              onChange={(e) => setGcashNumber(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleDonate}
          disabled={loading}
          className="w-full bg-accent text-white py-3 px-6 rounded-lg font-semibold"
        >
          {loading ? "Processing..." : "Donate Now"}
        </button>
      </div>
    </>
  );
}
