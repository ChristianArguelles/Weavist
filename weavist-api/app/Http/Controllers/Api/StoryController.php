<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Story;

class StoryController extends Controller
{
    public function index() {
        return Story::orderBy('id','desc')->get();
    }

    public function store(Request $r) {
        $data = $r->validate([
            'storyTitle'=>'required|string',
            'content'=>'nullable|string',
            'media'=>'nullable|string',
            'video'=>'nullable|string'
        ]);
        return Story::create($data);
    }

    public function show(Story $story) {
        return $story;
    }

    public function update(Request $r, Story $story) {
        $story->update($r->all());
        return $story;
    }

    public function destroy(Story $story) {
        $story->delete();
        return response()->noContent();
    }
}
