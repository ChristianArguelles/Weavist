<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    // store an uploaded image under storage/app/public/{folder}
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|image|max:5120', // 5MB
            'folder' => 'nullable|string'
        ]);

        $folder = $request->input('folder', 'uploads');
        $path = $request->file('file')->store($folder, 'public');
    // return absolute URL so frontend (served from a different origin) can load it directly
    $url = url(Storage::url($path));

        return response()->json([
            'path' => $path,
            'url' => $url,
            'message' => 'Uploaded'
        ], 201);
    }

    // list files in the public disk folder
    public function list(Request $request)
    {
        $folder = $request->input('folder', 'uploads');
        $files = Storage::disk('public')->files($folder);

        $items = array_map(function ($file) {
            return [
                'name' => basename($file),
                'path' => $file,
                'url' => url(Storage::url($file)),
            ];
        }, $files);

        return response()->json(['data' => $items]);
    }
}
