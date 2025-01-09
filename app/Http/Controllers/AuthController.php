<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'dob' => 'required|date',
            'profile_summary' => 'nullable|string|max:500',
            'skills' => 'nullable|string|max:255',
            'certifications' => 'nullable|string|max:255',
            'work_experience' => 'nullable|array',
            'work_experience.*.company' => 'nullable|string|max:255',
            'work_experience.*.role' => 'nullable|string|max:255',
            'work_experience.*.duration' => 'nullable|string|max:255',
            'education' => 'nullable|array',
            'education.*.school' => 'nullable|string|max:255',
            'education.*.degree' => 'nullable|string|max:255',
            'education.*.year' => 'nullable|string|max:4', // assuming year is a 4-digit number
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        // Create the user and store in the database
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'dob' => $request->dob,
            'profile_summary' => $request->profile_summary,
            'skills' => $request->skills,
            'certifications' => $request->certifications,
        ]);
    

if ($request->has('workExperience')) {
    foreach ($request->workExperience as $work) {
        // Create and associate work experience with the user
        $user->workExperiences()->create([
            'company' => $work['company'],
            'role' => $work['role'],
            'duration' => $work['duration'],
        ]);
    }
}

if ($request->has('education')) {
    foreach ($request->education as $edu) {
        $user->educations()->create([  // Updated from `education()` to `educations()`
            'school' => $edu['school'],
            'degree' => $edu['degree'],
            'year' => $edu['year'],
        ]);
    }
}

    
        // Generate JWT token for the created user
        $token = JWTAuth::fromUser($user);
    
        // Return the response with user data and token
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token,
            'education' => $edu,
            'workExperience'=>$work
            
        ], 201);
    }
    
    public function login(Request $request)
    {
        // Validate the incoming login request
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);
    
        // Retrieve the user by email
        $user = User::where('email', $request->email)->first();
                
        if (!$user) {
            return response()->json(['error' => 'Invalid email address'], 401);
        } elseif (!Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Incorrect password'], 401);
        }

        // Generate JWT token for the logged-in user
        $token = JWTAuth::fromUser($user);
    
        // Return the login response with the user data and token
        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user->makeHidden(['password', 'created_at', 'updated_at']),  // Hide sensitive fields
        ]);
    }

public function home(Request $request)
{
    // Retrieve authenticated user
    $user = auth()->user();

    if (!$user) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Return user data with relationships if needed
    return response()->json([
        'user' => $user->load(['workExperiences', 'educations']), // Load relationships
    ]);
}


}
