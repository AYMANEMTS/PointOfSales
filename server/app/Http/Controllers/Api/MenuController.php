<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MenuRequest;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menus = Menu::all();
        return $menus;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MenuRequest $menuRequest)
    {
        try {
            $validatedData = $menuRequest->validated();
            if ($menuRequest->hasFile('image')) {
                $image = $menuRequest->file('image');
                $pathName = time() . '_' . $image->getClientOriginalName();
                $image->storeAs('public/menu_images', $pathName);
                $validatedData['image'] = $pathName;
            }
            $menu = Menu::create($validatedData);
            return response()->json([
                'success' => true,
                'message' => 'Menu Created Successfully',
                'data' => $menu
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $e->errors(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Menu::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        return response()->json(["data" => $request->all()]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $menu = Menu::findOrFail($id);
            $menu->delete();
            return response()->json([
                'success' => true,
                'message' => 'Menu deleted successFully',
            ]);
        } catch(ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors(),
            ], 422);
        }
    }
}
