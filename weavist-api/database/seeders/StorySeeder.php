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
            'content'    => "In the hills of Abra, the steady rhythm of the loom is more than a craft—it's a heartbeat. Generations of weavers rise with the sun to dye threads with indigo and madder, then patiently guide each strand into place. Their work funds school books, repairs roofs, and weaves families together. Visitors often stop to watch; few leave without a scarf, and none leave without a story.",
            'media'      => $images[1],
            'video'      => 'https://www.youtube.com/watch?v=SAkwyQBjyto',
        ]);

        Story::create([
            'storyTitle' => 'Loom Traditions',
            'content'    => "Patterns are more than decoration—they are memory. Each motif marks a harvest, a wedding, a new child welcomed home. Elders teach the younger ones by feel as much as by sight, passing along techniques that outlast seasons and trends. What emerges from the loom is a living archive of a people and place.",
            'media'      => $images[2],
            'video'      => 'https://www.youtube.com/watch?v=PT1lPkGJ73s',
        ]);

        Story::create([
            'storyTitle' => 'Threads of Life',
            'content'    => "A village rebuilt itself one thread at a time. When storms took the fields, the looms kept turning. Cooperative workshops opened their doors, pooling orders and sharing skills. The result was not only income but pride: a sense that every finished bolt was a promise kept to the next generation.",
            'media'      => $images[3],
            'video'      => 'https://www.youtube.com/watch?v=2jPkdZVCxsk',
        ]);

    }
}
