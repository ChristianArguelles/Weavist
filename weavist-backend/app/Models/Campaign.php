<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model {
    protected $fillable = ['title','description','donationTarget','raisedAmount'];
    public function donations(){ return $this->hasMany(Donation::class); }
}
