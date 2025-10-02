<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use App\Models\Donation;
use App\Models\User;
use App\Models\Campaign;

class DonationSeeder extends Seeder
{
    public function run()
    {
        // Disable FKs to allow truncate
        Schema::disableForeignKeyConstraints();
        Donation::truncate();
        Schema::enableForeignKeyConstraints();

        $user = User::where('email', 'user@weavist.com')->first();
        $campaign = Campaign::first();

        // if ($user && $campaign) {
        //     Donation::create([
        //         'user_id' => $user->id,
        //         'campaign_id' => $campaign->id,
        //         'amount' => 50,
        //         'donationMethod' => 'card',
        //     ]);
        // }
    }
}
