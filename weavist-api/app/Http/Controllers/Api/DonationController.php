<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Models\Campaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class DonationController extends Controller
{
    // List all donations (admin only)
    public function index()
    {
        try {
            return Donation::with(['user', 'campaign'])->get();
        } catch (\Exception $e) {
            Log::error('Donation index error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch donations'], 500);
        }
    }

    // Make a donation (user)
    public function store(Request $request)
    {
        try {
            $request->validate([
                'campaign_id' => 'required|exists:campaigns,id',
                'amount' => 'required|numeric|min:1',
                'donationMethod' => 'required|string',
                'donor' => 'sometimes|array',
                'donor.name' => 'sometimes|string',
                'donor.phone' => 'sometimes|string',
                'donor.email' => 'sometimes|email',
            ]);

            $campaign = Campaign::find($request->campaign_id);

            // Check if campaign is active/open (like stock check)
            if (!$campaign || ($campaign->status ?? 'active') !== 'active') {
                return response()->json([
                    'error' => 'This campaign is not accepting donations at the moment.'
                ], 400);
            }

            $donor = $request->input('donor', []);

            $donation = Donation::create([
                'user_id' => Auth::id(),
                'campaign_id' => $request->campaign_id,
                'amount' => $request->amount,
                'donationMethod' => $request->donationMethod,
                'donor_name' => $donor['name'] ?? null,
                'donor_phone' => $donor['phone'] ?? null,
                'donor_email' => $donor['email'] ?? null,
            ]);

            // update campaign raisedAmount
            $campaign->increment('raisedAmount', $request->amount);

            return response()->json([
                'message' => 'Donation successful!',
                'donation' => $donation,
                'campaign' => $campaign->fresh(), // ✅ return updated campaign with new raisedAmount
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Donation store error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Something went wrong while processing the donation.'
            ], 500);
        }
    }
}
