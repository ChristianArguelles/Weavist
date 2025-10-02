<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Campaign;

class CampaignController extends Controller
{
    public function index() {
        return Campaign::orderBy('id','desc')->get();
    }

    public function store(Request $r) {
        $data = $r->validate([
            'title'=>'required|string',
            'description'=>'nullable|string',
            'donationTarget'=>'required|numeric',
            // raisedAmount should not be provided when creating a campaign — start at 0
            'raisedAmount'=>'nullable|numeric',
            'image'=>'nullable|string'
        ]);
        // enforce initial raisedAmount to 0 regardless of incoming payload
        $data['raisedAmount'] = 0;
        return Campaign::create($data);
    }

    public function show(Campaign $campaign) { return $campaign; }

    public function update(Request $r, Campaign $campaign) {
        // prevent accidental manual edits to raisedAmount through the normal update endpoint
        $updateData = $r->except('raisedAmount');
        $campaign->update($updateData);
        return $campaign;
    }

    public function destroy(Campaign $campaign) {
        $campaign->delete();
        return response()->noContent();
    }
}
