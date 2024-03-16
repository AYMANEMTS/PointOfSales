<?php

namespace App\Http\Controllers\Api;
use App\Http\Requests\MenuRequest;
use App\Models\Command;
use App\Models\Menu;
use App\Models\Table;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\ValidationException;


class AdminController extends Controller
{
    public function getUsers()
    {
        return User::query()->orderBy('created_at', 'desc')->get();
    }
    public function updateUser(Request $request,$id)
    {
        try {
            $user = User::findOrFail($id);
            $data = $request->validate([
                'name' => 'required',
                'email' => 'required|unique:users,email,'.$id,
                'role' => 'required'
            ]);
            $user->update($data);
            return response()->json([
                'success' => true,
                'message' => 'User Updated SuccessFuly'
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update this user',
                'errors' => $e->errors()
            ]);
        }
    }
    public function changePassword(Request $request,$id)
    {
        try {
            $user = User::findOrFail($id);
            $request->validate(['currentPass'=>'required','newPass'=>'required|min:8']);
            if(!Hash::check($request->input('currentPass'), $user->password)){
                return response()->json([
                    'success' => false,
                    'errors' => [
                        'currentPass' => ['Current password is incorrect']
                    ]
                ]);
            }
            $user->update([
                'password' => Hash::make($request->input('newPass')),
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Password changed successfully'
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to change password',
                'errors' => $e->errors()
            ]);
        }
    }
    public function destroyUser($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return response()->json([
                'success' => true,
                'message' => 'User Deleted SuccessFuly'
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete this user',
                'error' => $e
            ],500);
        }
    }
    public function updateMenu(MenuRequest $menuRequest,$id)
    {
        try {
            $menu = Menu::findOrFail($id);
            $validatedData = $menuRequest->validated();
            if ($menuRequest->hasFile('image')) {
                $image = $menuRequest->file('image');
                $pathName = time() . '_' . $image->getClientOriginalName();
                $image->storeAs('public/menu_images', $pathName);
                $validatedData['image'] = $pathName;
            }
            $menu->update($validatedData);
            return response()->json([
                'success' => true,
                'message' => 'Menu Updated Successfully',
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
    public function tableSettings(Request $request)
    {
        $numberOfTables = $request->input('numberOfTables');
        if (!is_numeric($numberOfTables) || $numberOfTables < 1) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid number of tables provided',
            ]);
        }
        $tables = Table::all();
        foreach ($tables as $table){
            $table->delete();
        }
        for ($i=1;$i<=$numberOfTables;$i++){
            Table::create(['name' => $i]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Tables created SuccessFully',
            'tables' => Table::all(),
        ]);
    }
    public function getRossetCommands()
    {
        $commands = Command::query()->with(['menus','table','user'])->get()->groupBy(function ($date){
            return Carbon::parse($date->created_at)->format("d/m/Y");
        });
        $formattedCommands=[];
        foreach ($commands as $date => $groupedCommands) {
            $total = $groupedCommands->sum('total');
            $formattedCommands[] = [
                'date' => $date,
                'commands' => $groupedCommands,
                'total' => $total
            ];
        }
        $data = array_reverse($formattedCommands);
        return response()->json($data);
    }

    public function getCommandsByDate(Request $request)
    {
        $dateString = $request->input('date');
        $date = Carbon::createFromFormat('d/m/Y', $dateString);
        if (!$date || !$date->isValid()) {
            return response()->json(['success' => false, 'message' => 'Invalid date'], 500);
        }
        $commands = Command::whereDate('created_at', $date->format('Y-m-d'))->with(['user','table','menus'])->get();
        return response()->json(['success' => true, 'commands' => $commands,'total'=>$commands->sum('total')]);
    }

}
