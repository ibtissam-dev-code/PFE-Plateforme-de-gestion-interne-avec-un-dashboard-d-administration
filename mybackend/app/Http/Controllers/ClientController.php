<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    // 1️⃣ List all clients with projets. \\::all()
    public function index()
    {
        $clients = Client::with('projets')->get();

        return response()->json($clients);
    }

    // 2️⃣ Show single client
    public function show($id)
    {
        $client = Client::with('projets')->find($id);

        if (!$client) {
            return response()->json([
                'message' => 'Client non trouvé'
            ], 404);
        }

        return response()->json($client);
    }

    // 3️⃣ Create new client
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'societe' => 'nullable|string|max:255',
            'email' => 'required|email|unique:clients,email',
            'telephone' => 'nullable|string|max:20',
        ]);

        $client = Client::create($request->all());

        return response()->json([
            'message' => 'Client ajouté avec succès',
            'client' => $client
        ], 201);
    }

    // 4️⃣ Update existing client
    public function update(Request $request, $id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json([
                'message' => 'Client non trouvé'
            ], 404);
        }

        $request->validate([
            'nom' => 'sometimes|string|max:255',
            'societe' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:clients,email,' . $id,
            'telephone' => 'sometimes|string|max:20',
        ]);

        $client->update($request->all());

        return response()->json([
            'message' => 'Client mis à jour avec succès',
            'client' => $client
        ]);
    }

    // 5️⃣ Delete client
    public function destroy($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json([
                'message' => 'Client non trouvé'
            ], 404);
        }

        $client->delete();

        return response()->json([
            'message' => 'Client supprimé avec succès'
        ]);
    }
}