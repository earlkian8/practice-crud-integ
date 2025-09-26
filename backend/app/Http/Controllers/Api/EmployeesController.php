<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EmployeesController extends Controller
{
    public function index()
    {
        $employees = Employee::all();
        return response()->json($employees);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name'  => 'required|string|max:100',
            'email'      => 'required|email|unique:employees,email',
            'phone'      => 'nullable|string|max:20',
            'position'   => 'required|string|max:100',
            'salary'     => 'required|numeric|min:0',
            'date_hired' => 'nullable|date',
            'image'      => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $disk      = env('FILESYSTEM_DISK', 'public');
            $directory = "employees";
            $uploaded  = $request->file('image');

            $validated['image'] = basename($uploaded->store($directory, $disk));
        }

        $employee = Employee::create($validated);

        return response()->json($employee, 201);
    }

    public function show($id)
    {
        $employee = Employee::findOrFail($id);
        return response()->json($employee);
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'sometimes|string|max:100',
            'last_name'  => 'sometimes|string|max:100',
            'email'      => 'sometimes|email|unique:employees,email,' . $employee->id,
            'phone'      => 'nullable|string|max:20',
            'position'   => 'sometimes|string|max:100',
            'salary'     => 'sometimes|numeric|min:0',
            'date_hired' => 'nullable|date',
            'image'      => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $disk      = env('FILESYSTEM_DISK', 'public');
            $directory = "employees";
            $uploaded  = $request->file('image');

            // Delete previous image if exists
            if ($employee->image) {
                $oldImagePath = $directory . '/' . $employee->image;
                if (Storage::disk($disk)->exists($oldImagePath)) {
                    Storage::disk($disk)->delete($oldImagePath);
                }
            }

            // Store new image
            $validated['image'] = basename($uploaded->store($directory, $disk));
        }

        $employee->update($validated);

        return response()->json($employee);
    }

    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);
        
        // Delete image if exists
        if ($employee->image) {
            $disk = env('FILESYSTEM_DISK', 'public');
            $imagePath = "employees/" . $employee->image;
            if (Storage::disk($disk)->exists($imagePath)) {
                Storage::disk($disk)->delete($imagePath);
            }
        }
        
        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully']);
    }

    public function getItemsImage($image)
    {
        $path = 'employees/' . $image;

        if (!Storage::disk('local')->exists($path)) {
            abort(404);
        }

        $file = Storage::disk('local')->get($path);
        $type = Storage::disk('local')->mimeType($path);

        return response($file, 200)
            ->header('Content-Type', $type)
            ->header('Content-Disposition', 'inline; filename="'.$image.'"');
    }
}
