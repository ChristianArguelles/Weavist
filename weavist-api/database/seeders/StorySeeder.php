<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Story;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class StorySeeder extends Seeder
{
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        Story::truncate();
        Schema::enableForeignKeyConstraints();

        // Images will be served from storage/app/public/stories
        // Make sure: php artisan storage:link
        $images = [
            1 => Storage::url('stories/story1.jpg'),
            2 => Storage::url('stories/story2.jpg'),
            3 => Storage::url('stories/story3.jpg'),
        ];

        Story::create([
            'storyTitle' => 'The Weaver of Abra',
            'content'    => 'A short tale about craft and community.',
            'media'      => $images[1],
            'video'      => 'https://www.youtube.com/watch?v=SAkwyQBjyto',
        ]);

        Story::create([
            'storyTitle' => 'Loom Traditions',
            'content'    => 'Preserving weaving traditions across generations.',
            'media'      => $images[2],
            'video'      => 'https://www.youtube.com/watch?v=PT1lPkGJ73s',
        ]);

        Story::create([
            'storyTitle' => 'Threads of Life',
            'content'    => 'How weaving shaped one village.',
            'media'      => $images[3],
            'video'      => 'https://www.youtube.com/watch?v=2jPkdZVCxsk',
        ]);
    }
}
