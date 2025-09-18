<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use App\Models\Story;

class StorySeeder extends Seeder
{
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        Story::truncate();
        Schema::enableForeignKeyConstraints();

        
        Story::create([
            'storyTitle' => 'The Weaver of Abra',
            'content' => 'A short tale about craft and community.',
            'media' => '/images/stories/story1.jpg',
            'video' => '/videos/story1.mp4',
        ]);

        Story::create([
            'storyTitle' => 'Loom Traditions',
            'content' => 'Preserving weaving traditions across generations.',
            'media' => '/images/stories/story2.jpg',
            'video' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        ]);

        Story::create([
            'storyTitle' => 'Threads of Life',
            'content' => 'How weaving shaped one village.',
            'media' => '/images/stories/story3.jpg',
            'video' => null,
        ]);
    }
}
