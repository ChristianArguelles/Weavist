<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use App\Models\Donation;

class DonationSeeder extends Seeder
{
    public function run()
    {
        // Disable FKs to allow truncate
        Schema::disableForeignKeyConstraints();
        Donation::truncate();
        Schema::enableForeignKeyConstraints();

        // Leave empty intentionally — no initial donations seeded
    }
}
