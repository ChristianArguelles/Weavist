<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'productName',
        'description',
        'productPrice',
        'stock',
        'image'
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }
        
        // If image already contains a full URL (from seeder), return as is
        if (str_starts_with($this->image, 'http')) {
            return $this->image;
        }
        
        // If image already starts with /storage/, just prepend the base URL
        if (str_starts_with($this->image, '/storage/')) {
            return asset($this->image);
        }
        
        // Otherwise, assume it's a filename and prepend storage path
        return asset('storage/' . $this->image);
    }
}
