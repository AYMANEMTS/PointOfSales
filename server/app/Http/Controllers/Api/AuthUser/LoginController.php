<?php

namespace App\Http\Controllers\Api\AuthUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(LoginRequest $loginRequest)
    {
        $credentials = $loginRequest->validated();
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('ice-ebi-zbi')->plainTextToken;

            return response()->json([
                'success' => true,
                'token' => $token,
                'user' => $user,
            ]);
        }
        return response()->json([
           "success" => false,
           "message" => "Validation errors",
           "errors" => [
               "email" => "The provided credentials are incorrect."
           ]
        ]);
    }
    public function store(UserRequest $userRequest)
    {
        try {
            $dataValidated = $userRequest->validated();
            $dataValidated['password'] = Hash::make($dataValidated['password']);
            $user = User::create($dataValidated);
            return response()->json([
                "success" => true,
                "message" => "User created successfuly"
            ]);

        } catch (ValidationException $e){
            return response()->json([
                "success" => false,
                'error' => $e,
            ]);
        }
    }
}
