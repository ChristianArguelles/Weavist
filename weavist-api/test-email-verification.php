<?php
/**
 * Local Email Verification Test Script
 * 
 * This script helps you test email verification locally.
 * Run this script to see how the email verification works.
 */

require_once 'vendor/autoload.php';

use App\Models\User;
use App\Notifications\EmailVerificationNotification;

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "=== Weavist Email Verification Test ===\n\n";

// Check if we have any users
$userCount = User::count();
echo "Total users in database: $userCount\n";

if ($userCount === 0) {
    echo "\n❌ No users found. Please register a user first through the frontend.\n";
    echo "1. Go to http://localhost:5173/register\n";
    echo "2. Register a new account\n";
    echo "3. Run this script again\n";
    exit;
}

// Get the first user
$user = User::first();
echo "Testing with user: {$user->name} ({$user->email})\n";
echo "Email verified: " . ($user->hasVerifiedEmail() ? 'Yes' : 'No') . "\n\n";

// Send verification email
echo "📧 Sending verification email...\n";
try {
    $user->sendEmailVerificationNotification();
    echo "✅ Email sent successfully!\n\n";
    
    echo "📋 Next steps:\n";
    echo "1. Check the Laravel log file: storage/logs/laravel.log\n";
    echo "2. Look for the email content in the log\n";
    echo "3. Copy the verification URL from the log\n";
    echo "4. Open the URL in your browser to test verification\n\n";
    
    echo "🔗 To view the log file, run:\n";
    echo "   tail -f storage/logs/laravel.log\n";
    echo "   (or open storage/logs/laravel.log in your editor)\n\n";
    
    echo "🌐 Or visit: http://127.0.0.1:8000/api/test-email\n";
    echo "   This will also send a test email and show the log location.\n";
    
} catch (Exception $e) {
    echo "❌ Error sending email: " . $e->getMessage() . "\n";
}

echo "\n=== Test Complete ===\n";
