<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'tables' => Table::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $name = $request->validate(['name'=>'required']);
            $table = Table::create($name);
            return response()->json(['success'=>true,'message'=>'table created successfully','data'=>$table],201);

        }catch (ValidationException $e){
            return response()->json(['message'=>'Validation Error','errors'=>$e->errors()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $table = Table::with(['commands','commands.menus'])->findOrFail($id);
        return $table;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $name = $request->validate(['name'=>'required']);
        try {
            $table = Table::findOrFail($id);
            $table->update($name);
            return response()->json(['message'=>'table updated successfully','data'=>$table],201);

        }catch (ValidationException $e){
            return response()->json(['message'=>'Validation Error','errors'=>$e->errors()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $table = Table::findOrFail($id);
            $table->delete();
            return response()->json([
                'success' => true,
                'message' => 'table deleted successFully',
            ]);
        } catch(ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors(),
            ], 422);
        }
    }
}
