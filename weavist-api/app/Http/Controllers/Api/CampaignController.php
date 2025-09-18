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
            'raisedAmount'=>'nullable|numeric',
            'image'=>'nullable|string'
        ]);
        return Campaign::create($data);
    }

    public function show(Campaign $campaign) { return $campaign; }

    public function update(Request $r, Campaign $campaign) {
        $campaign->update($r->all());
        return $campaign;
    }

    public function destroy(Campaign $campaign) {
        $campaign->delete();
        return response()->noContent();
    }
}
