<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Client;
use App\Models\User;

class Projet extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'type',
        'etat',
        'date_debut',
        'date_fin',
        'client_id',
        'user_id', // زيدناها هنا
    ];

    // Projet كينتمي ل Client
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    // Projet كينتمي ل User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}