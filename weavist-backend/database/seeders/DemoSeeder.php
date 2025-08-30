<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Story;
use App\Models\Campaign;

class DemoSeeder extends Seeder {
    public function run(): void {
        Product::create(['productName'=>'Handwoven Scarf','description'=>'Cotton weave','productPrice'=>499.00,'stock'=>20]);
        Product::create(['productName'=>'Abaca Bag','description'=>'Locally crafted','productPrice'=>1299.00,'stock'=>10]);

        Story::create(['storyTitle'=>'Weaving Heritage','content'=>'Our community keeps traditions alive.']);

        Campaign::create(['title'=>'Loom Upgrade','description'=>'Help buy new looms','donationTarget'=>50000.00,'raisedAmount'=>0]);
    }
}
