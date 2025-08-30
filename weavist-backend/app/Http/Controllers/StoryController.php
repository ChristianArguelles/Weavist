<?php
namespace App\Http\Controllers;
use App\Models\Story;

class StoryController extends Controller {
    public function index(){ return response()->json(Story::latest()->get()); }
}
