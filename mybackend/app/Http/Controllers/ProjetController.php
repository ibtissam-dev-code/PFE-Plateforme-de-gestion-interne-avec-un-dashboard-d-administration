<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Projet;

class ProjetController extends Controller
{
    // 1️⃣ List tous les projets avec relations
   public function index()
{
    $user = auth()->user();

    $query = \App\Models\Projet::with(['client', 'user'])->latest();

    // إذا كان user عادي
    if ($user && $user->role !== 'admin') {
        $query->where('user_id', $user->id);
    }

    return response()->json($query->get());
}

    // 2️⃣ Afficher un projet spécifique
    public function show($id)
    {
        $projet = Projet::with('client','user')->find($id);

        if (!$projet) {
            return response()->json([
                'message' => 'Projet non trouvé'
            ], 404);
        }

        return response()->json($projet);
    }

    // 3️⃣ Ajouter un nouveau projet
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'type' => 'required|string',
            'etat' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'client_id' => 'required|integer|exists:clients,id',
            'user_id' => 'required|integer|exists:users,id',
        ]);

        $projet = Projet::create($request->all());

        return response()->json([
            'message' => 'Projet ajouté avec succès',
            'projet' => Projet::with('client','user')->find($projet->id)
        ], 201);
    }

    // 4️⃣ Modifier un projet
    public function update(Request $request, $id)
    {
        $projet = Projet::find($id);

        if (!$projet) {
            return response()->json([
                'message' => 'Projet non trouvé'
            ], 404);
        }

        $request->validate([
            'nom' => 'sometimes|string',
            'type' => 'sometimes|string',
            'etat' => 'sometimes|string',
            'date_debut' => 'sometimes|date',
            'date_fin' => 'sometimes|date|after_or_equal:date_debut',
            'client_id' => 'sometimes|integer|exists:clients,id',
            'user_id' => 'sometimes|integer|exists:users,id',
        ]);

        $projet->update($request->all());

        return response()->json([
            'message' => 'Projet mis à jour',
            'projet' => Projet::with('client','user')->find($projet->id)
        ]);
    }

    // 5️⃣ Supprimer un projet
    public function destroy($id)
    {
        $projet = Projet::find($id);

        if (!$projet) {
            return response()->json([
                'message' => 'Projet non trouvé'
            ], 404);
        }

        $projet->delete();

        return response()->json([
            'message' => 'Projet supprimé avec succès'
        ]);
    }
}