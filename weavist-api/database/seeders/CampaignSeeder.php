<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use App\Models\Campaign;

class CampaignSeeder extends Seeder
{
    public function run()
    {

        Schema::disableForeignKeyConstraints();
        Campaign::truncate();
        Schema::enableForeignKeyConstraints();

        Campaign::create([
            'title' => 'Support Remote Weavers',
            'description' => 'Fund for tools and materials',
            'donationTarget' => 10000,
            'raisedAmount' => 1200,
            'image' => '/images/campaigns/campaign1.jpg',
        ]);

        Campaign::create([
            'title' => 'Weaving Education',
            'description' => 'Workshops for youth',
            'donationTarget' => 5000,
            'raisedAmount' => 800,
            'image' => '/images/campaigns/campaign2.jpg',
        ]);
    }
}
