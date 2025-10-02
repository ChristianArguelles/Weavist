<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use App\Models\Campaign;

class CampaignSeeder extends Seeder
{
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        Campaign::truncate();
        Schema::enableForeignKeyConstraints();

        // Images will be served from storage/app/public/campaigns
        // Make sure: php artisan storage:link
        $images = [
            1 => Storage::url('campaigns/campaign1.jpg'),
            2 => Storage::url('campaigns/campaign2.jpg'),
        ];

        Campaign::create([
            'title'          => 'Support Remote Weavers',
            'description'    => 'Fund for tools and materials',
            'donationTarget' => 10000,
            'raisedAmount'   => 0,
            'image'          => $images[1],
        ]);

        Campaign::create([
            'title'          => 'Weaving Education',
            'description'    => 'Workshops for youth',
            'donationTarget' => 5000,
            'raisedAmount'   => 0,
            'image'          => $images[2],
        ]);
    }
}
