<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Command;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;
class CashierController extends Controller
{
    public function getTodayCommands()
    {
        $commands = Command::with(['menus', 'table', 'user'])
            ->whereDate('created_at',Carbon::today())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'commands' => $commands
        ]);
    }
    public function markAsPayedCommand(Request $request, $id)
    {
        try {
            $command = Command::findOrFail($id);
            $command->payed = true;
            $command->save();
            return response()->json([
                'success' => true,
                'message' => 'Command Updated as Payed Successfully',
                'data' => $command
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'error' => $e,
            ]);
        }
    }
    public function commandAddMenus(Request $request, $id)
    {
        try {
            $command = Command::findOrFail($id);
            $menuChoices = $request->menu_choices;
            if (!is_null($menuChoices)) {
                foreach ($menuChoices as $menuChoice) {
                    $menuId = $menuChoice['menu_id'];
                    $choices = $menuChoice['choices'];
                    $command->menus()->attach($menuId, ['choices' => $choices]);
                }
            }else{
                return response()->json([
                    'success' => false ,
                    'message' => 'Undifined data menu_choices',

                ]);
            }
            if ($command->menus->isNotEmpty()) {
                $total = $command->menus()->sum('price');
                $command->total = $total;
                $command->save();
            }

            return response()->json([
                'success' => true ,
                'message' => 'Command Added New Menus Successfully',
                'data' => $command,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'error' => $e,
            ]);
        }
    }

    public function getDaysWithCommands()
{
    // Retrieve distinct days along with their commands
    $daysWithCommands = Command::selectRaw('DATE(created_at) as day')
        ->groupBy('day')
    
        ->orderBy('day', 'desc')
        ->get();

    return response()->json([
        'success' => true,
        'daysWithCommands' => $daysWithCommands,
    ]);
}



}
