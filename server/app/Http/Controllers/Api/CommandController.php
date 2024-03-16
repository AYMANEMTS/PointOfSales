<?php

namespace App\Http\Controllers\Api;

use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Controller;
use App\Http\Requests\CommandRequest;
use App\Models\Command;
use Illuminate\Http\Request;

class CommandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $commands = Command::with(['menus', 'table', 'user'])
        ->orderBy('created_at', 'desc')
        ->get();

        return response()->json([
            'success' => true,
            'commands' =>  $commands
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommandRequest $commandRequest)
    {
        try {
            $validatedData = $commandRequest->validated();
            $command = Command::create($validatedData);
            $command->number = Command::max('number') + 1;
            $command->save();
            foreach ($commandRequest->menu_choices as $menuChoice) {
                $menuId = $menuChoice['menu_id'];
                $choices = $menuChoice['choices'];
                $command->menus()->attach($menuId, ['choices' => $choices]);
            }
            $total = $command->menus()->sum('price');
            $command->total = $total;
            $command->save();
            return response()->json([
                'message' => 'Command Created Successfully',
                'data' => $command,
                'success' => true
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors(),
                'success' => false
            ],403);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $command = Command::with(['menus','table','user'])->find($id);
        return $command;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CommandRequest $commandRequest, string $id)
    {
        try {
            $validatedData = $commandRequest->validated();
            $command = Command::findOrFail($id);
            $command->update($validatedData);
            return response()->json([
                'message' => 'Command Created Successfully',
                'data' => $command
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $command = Command::findOrFail($id);
            $command->menus()->detach();
            $command->delete();
            return response()->json([
                'message' => 'command deleted successFully',
            ], 422);
        } catch(ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors(),
            ], 422);
        }
    }
}
