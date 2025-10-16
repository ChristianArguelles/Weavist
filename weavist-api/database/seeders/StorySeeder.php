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
        $images = [
            1 => Storage::url('stories/story1.jpg'),
            2 => Storage::url('stories/story2.jpg'),
            3 => Storage::url('stories/story3.jpg'),
        ];

        Story::create([
            'storyTitle' => 'The Weaver of Abra',
            'content'    => "In the hills of Abra, the steady rhythm of the loom is more than a craft—it's a heartbeat. Generations of weavers rise with the sun to dye threads with indigo and madder, then patiently guide each strand into place. Their hands know the stories of their ancestors, and each pattern tells of love, struggle, and resilience.\n\nVisitors often stop to watch; few leave without a scarf, and none leave without a story. The market hums with the chatter of buyers and sellers, yet the looms continue their song, uninterrupted by the outside world. Children peek between the threads, learning the rhythm, learning the patience.\n\nThe work of these artisans supports more than just families; it sustains the village. Funds from each finished textile go to repair homes, pay for schoolbooks, and support community celebrations. Even those who never pick up a shuttle are touched by the care embedded in every weave.\n\nAs dusk falls, the looms slow but never stop entirely. Stories passed down through generations live in the textures, colors, and patterns, creating a legacy that is tangible, vibrant, and deeply human. The Weaver of Abra is not just an occupation—it is a living testament to culture and community.",
            'media'      => $images[1],
            'video'      => 'https://www.youtube.com/watch?v=SAkwyQBjyto',
        ]);

        Story::create([
            'storyTitle' => 'Loom Traditions',
            'content'    => "Patterns are more than decoration—they are memory. Each motif marks a harvest, a wedding, a new child welcomed home. Elders teach the younger ones by feel as much as by sight, passing along techniques that outlast seasons and trends. The loom itself becomes a teacher, whispering lessons of patience and precision.\n\nIn each workshop, conversations float between the clicks of the shuttle. Stories of past triumphs, local folklore, and lessons learned from mistakes accompany every knot and loop. This oral tradition intertwines seamlessly with the physical patterns woven into the cloth.\n\nVisitors often marvel at the diversity of designs and the depth of symbolism. A simple zigzag may recall a storm weathered, a circle may represent a communal celebration, and colors are chosen not just for beauty, but for meaning. Every piece tells a tale of the land, its people, and their shared history.\n\nThrough these looms, the community finds continuity. Traditions once threatened by modern pressures survive and thrive because each generation respects the stories embedded in the threads. The craft connects them to their past, guides their present, and secures a future in which culture is honored and remembered.",
            'media'      => $images[2],
            'video'      => 'https://www.youtube.com/watch?v=PT1lPkGJ73s',
        ]);

        Story::create([
            'storyTitle' => 'Threads of Life',
            'content'    => "A village rebuilt itself one thread at a time. When storms took the fields, the looms kept turning. Cooperative workshops opened their doors, pooling orders and sharing skills. The result was not only income but pride: a sense that every finished bolt was a promise kept to the next generation.\n\nEach artisan brings their own story to the fabric. Some are young, eager to learn, while elders provide guidance shaped by decades of experience. Together, they create not just cloth, but a network of resilience, solidarity, and community support that extends far beyond the workshop walls.\n\nOrders from neighboring towns and distant cities pour in, each demanding care and precision. The villagers balance creativity with consistency, ensuring every product meets the high standards they have set for themselves. Through this shared effort, they transform challenge into opportunity.\n\nThe threads carry more than color and texture; they carry hope, identity, and cultural continuity. When a piece leaves the workshop, it is imbued with stories, skill, and love. In this village, life itself is woven through every loom, reminding all that the strength of a community is measured not just in survival, but in the beauty it creates together.",
            'media'      => $images[3],
            'video'      => 'https://www.youtube.com/watch?v=2jPkdZVCxsk',
        ]);
    }
}
