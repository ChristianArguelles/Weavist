<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Models\Campaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DonationController extends Controller
{
    // List all donations (admin only)
    public function index()
    {
        return Donation::with(['user', 'campaign'])->get();
    }

    // Make a donation (user)
    public function store(Request $request)
    {
        $request->validate([
            'campaign_id' => 'required|exists:campaigns,id',
            'amount' => 'required|numeric|min:1',
            'donationMethod' => 'required|string',
        ]);

        $donation = Donation::create([
            'user_id' => Auth::id(),
            'campaign_id' => $request->campaign_id,
            'amount' => $request->amount,
            'donationMethod' => $request->donationMethod,
        ]);

        // update campaign raisedAmount
        $campaign = Campaign::find($request->campaign_id);
        $campaign->increment('raisedAmount', $request->amount);

        return response()->json([
            'message' => 'Donation successful!',
            'donation' => $donation,
        ]);
    }
}
