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

        $moreStories = [
            ['title' => 'Weaving New Beginnings', 'content' => "After a season of setbacks, the community returned to the workshop with renewed purpose. Small loans bought new spindles and sturdy frames. Orders trickled in, then gathered pace. Each finished piece became a step forward—proof that recovery can be crafted with patience and shared effort."],
            ['title' => 'Patterns of Heritage', 'content' => "Grandmothers trace motifs with careful hands, telling stories that stretch beyond the borders of cloth. The diamonds and waves stand for mountains and rivers; the tiny ladders mark growth and learning. These designs are an alphabet of belonging, legible to anyone who has ever called this place home."],
            ['title' => 'From Loom to Market', 'content' => "Bundles of fabric ride the morning jeepney to town, then find their way to boutiques and bazaar stalls. Merchants share the names of the weavers with pride, and customers send photos of the pieces in their new homes. The journey of each textile is a bridge between makers and wearers."],
            ['title' => 'Colors of the Highlands', 'content' => "Leaves, bark, and flowers steep in quiet pots, releasing colors that echo the hills at sunrise and dusk. Indigo cools like evening shade; turmeric warms like noon sun. Dyers test, rinse, and dry, learning the language of color with every batch."],
            ['title' => 'Hands that Tell Stories', 'content' => "Calloused palms and nimble fingers remember movements even when words falter. A weaver can explain tension and balance without speaking, showing how a gentle pull here and a firm press there keeps the whole fabric true."],
            ['title' => 'The Rhythm of the Loom', 'content' => "Tap-click, tap-click. The sound marks time like a metronome for the day. It is meditative, but never idle; the loom invites focus and rewards consistency. In that rhythm, worries soften and clarity arrives."],
            ['title' => 'Community of Threads', 'content' => "No loom stands alone. Spinners, dyers, weavers, and tailors share space and stories. Someone brings snacks, another brings news, and everyone brings what they can so that the work—and the workers—are sustained."],
            ['title' => 'Inherited Craft', 'content' => "Children watch first, then help. They wind bobbins, carry yarn, and learn to see quality with a quick glance. The craft becomes a language spoken at home: a way of understanding patience, precision, and pride."],
            ['title' => 'Festival of Fabrics', 'content' => "Once a year, the plaza blooms with textiles. Stalls burst with pattern and color, musicians play, and elders judge the year’s finest cloth. Awards matter less than the laughter that follows, the sense that the whole town is stitched together."],
            ['title' => 'Stitching the Future', 'content' => "New designs meet old techniques as young entrepreneurs test online shops and collaborations. They keep what is essential, adapt what is helpful, and make room for the next generation to find their voice at the loom."],
        ];

        $i = 1;
        foreach ($moreStories as $s) {
            $imageIndex = (($i - 1) % 3) + 1; // cycle 1..3
            Story::create([
                'storyTitle' => $s['title'],
                'content'    => $s['content'],
                'media'      => $images[$imageIndex],
                'video'      => 'https://www.youtube.com/watch?v=SAkwyQBjyto',
            ]);
            $i++;
        }
    }
}
