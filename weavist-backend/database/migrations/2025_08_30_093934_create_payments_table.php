<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('payments', function (Blueprint $t) {
            $t->id();
            $t->foreignId('order_id')->constrained()->cascadeOnDelete();
            $t->decimal('amount',10,2);
            $t->string('paymentMethod');
            $t->string('status')->default('PAID');
            $t->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('payments');
    }
};
