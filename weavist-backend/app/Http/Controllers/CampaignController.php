<?php
namespace App\Http\Controllers;
use App\Models\Campaign;

class CampaignController extends Controller {
    public function index(){ return response()->json(Campaign::latest()->get()); }
}
