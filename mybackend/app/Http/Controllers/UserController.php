<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    
    public function index()
    {
        // حيدنا الـ where باش يرجع كاع الـ users (سواء admin أو user عديين) مع حساب مشاريعهم
        $users = User::withCount('projets')->get();

        return response()->json($users);
    }

    // 2️⃣ عرض مستخدم واحد ب الـ id
    public function show($id)
    {
        $user = User::withCount('projets')->find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur non trouvé'
            ], 404);
        }

        return response()->json($user);
    }

    // 3️⃣ تعديل بيانات الموظف (المهم لـ EditEmployee ف الـ React)
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Employé non trouvé'
            ], 404);
        }

        $request->validate([
            'nom' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
            'role' => 'sometimes|string|max:255',
        ]);

        // تحديث البيانات العادية
        $user->fill($request->only(['nom', 'email', 'role']));

        // إلا صيفط الـ User باسوورد جديد، نديرو ليه الـ Hash
        if ($request->has('password') && !empty($request->password)) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'message' => 'Employé mis à jour avec succès',
            'user' => $user
        ]);
    }

    // 4️⃣ حذف موظف من الداتا بيز
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Employé non trouvé'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'Employé supprimé avec succès'
        ]);
    }
}