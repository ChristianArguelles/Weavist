<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Story extends Model {
    protected $fillable = ['storyTitle','content','media'];
}
