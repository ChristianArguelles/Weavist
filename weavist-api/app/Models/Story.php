<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    use HasFactory;

    protected $fillable = ['storyTitle','content','media','video'];

    protected $appends = ['media_url'];

    public function getMediaUrlAttribute()
    {
        if (!$this->media) {
            return null;
        }
        
        // If media already contains a full URL (from seeder), return as is
        if (str_starts_with($this->media, 'http')) {
            return $this->media;
        }
        
        // If media already starts with /storage/, just prepend the base URL
        if (str_starts_with($this->media, '/storage/')) {
            return asset($this->media);
        }
        
        // Otherwise, assume it's a filename and prepend storage path
        return asset('storage/' . $this->media);
    }
}
