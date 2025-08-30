<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Donation;
use App\Models\Campaign;

class DonationController extends Controller {
    public function donate(Request $r){
        $data = $r->validate([
            'campaign_id'=>'required|exists:campaigns,id',
            'amount'=>'required|numeric|min:1',
            'method'=>'required|string'
        ]);
        $don = Donation::create([
            'user_id'=>$r->user()->id,
            'campaign_id'=>$data['campaign_id'],
            'amount'=>$data['amount'],
            'donationMethod'=>$data['method'],
        ]);
        $camp = Campaign::find($data['campaign_id']);
        $camp->raisedAmount += $data['amount']; $camp->save();
        return response()->json(['donation'=>$don,'campaign'=>$camp]);
    }
}
