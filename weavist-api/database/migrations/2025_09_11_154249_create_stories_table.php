<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('stories', function (Blueprint $table) {
            $table->id();
            $table->string('storyTitle');
            $table->text('content')->nullable();
            $table->string('media')->nullable();  // image
            $table->string('video')->nullable();  // video URL or local path
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('stories');
    }
};
